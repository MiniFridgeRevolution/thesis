import React from 'react'

import ace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import axios from 'axios'

let socket = io.connect();
let pc;
		let configuration = {
		  'iceServers': [{
		    'url': 'stun:stun.l.google.com:19302'
		  }]
		};

let localStream;


export default class Collaborate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			room_name: '',
			code: '',
			info: '',
			exit_room: '',
			applyingChanges: false,
			username: ''
		}
		this.handleCreateRoom = this.handleCreateRoom.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleJoinRoom = this.handleJoinRoom.bind(this);
		this.handleEditorContentChange = this.handleEditorContentChange.bind(this);
		this.updateEditorContent = this.updateEditorContent.bind(this);
		this.handleRunCode = this.handleRunCode.bind(this);
		this.updateResult = this.updateResult.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.ResetEditor = this.ResetEditor.bind(this);
		this.handleInfo = this.handleInfo.bind(this);
		this.exitRoom = this.exitRoom.bind(this);
		this.handleExitRoom = this.handleExitRoom.bind(this);
		this.start = this.start.bind(this);
		this.startCall = this.startCall.bind(this);
		this.stopCall = this.stopCall.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleCandidate = this.handleCandidate.bind(this);
	}
	componentWillMount() {

		// var username = prompt("what is your name?");
		console.log('COLLABORATE Username',this.props.userData.user.name);
		this.setState({username: this.props.userData.user.name});
		// console.log(username);
	}
	componentDidMount() {
		var context = this;		
		/*********** live coding *********/
		this.editor = ace.edit(this.refs.root);
	    this.editor.getSession().setMode("ace/mode/javascript");
	    this.editor.setTheme("ace/theme/github");

	    socket.on('connect', function(){
	    	console.log(context.state.username, ' connected');
	    });
	    socket.on('disconnect', this.exitRoom);
	    socket.on('room-exists', function(msg) {
	      alert(msg);
	    });
	    // changes in editing board
	    this.editor.on('change', this.handleEditorContentChange);
	    socket.on('editor-content-changes', this.updateEditorContent);
	    // clear editor content
	    socket.on('clear-editor', this.ResetEditor);
	    // 'run code'
	    socket.on('submit-val', this.updateResult);
	    // handle info
	    socket.on('info', this.handleInfo);
	    // exit room
	    socket.on('exit_room', this.handleExitRoom);
		/**************************************/

		/*********** video conference *********/
		socket.on('description', this.handleDescription);

		
		socket.on('candidate', this.handleCandidate);

    socket.on('stopCall', this.stopCall);


	}

	/************ live coding *************/
	handleFormChange(e) {
		this.setState({room_name: e.target.value});
	}
	handleCreateRoom(e) {
		e.preventDefault();
    socket.emit('addroom', this.state.username, this.state.room_name);
    e.target.value = '';
	}
	handleJoinRoom(e) {
		e.preventDefault();
    socket.emit('join-room', this.state.username, this.state.room_name);
	}
	handleEditorContentChange(e) {
    if (!this.state.applyingChanges) {
      socket.emit('editor-content-changes', this.state.room_name, JSON.stringify(e));
    }
    return false;
	}
	updateEditorContent(val) {
		this.setState({applyingChanges: true});
    val = JSON.parse(val);
    this.editor.getSession().getDocument().applyDeltas([val]);
    this.setState({applyingChanges: false});
	}
	handleReset() {
		socket.emit('clear-editor', this.state.room_name);
	}
	ResetEditor() {
		this.editor.getSession().setValue("");
	}
	handleRunCode() {
    var val = this.editor.getValue();
    socket.emit('submit-val', this.state.room_name, val);
    return false;
	}
	updateResult(val) {
    this.setState({applyingChanges: true});
    this.setState({code: val});
    this.setState({applyingChanges: false});
	}
	handleInfo(msg) {
		// console.log('handle info', msg);
		this.setState({info: msg});
	}
	exitRoom() {
		socket.emit('exit_room', this.state.username, this.state.room_name);
	}
	handleExitRoom() {
		this.setState({info: 'You left the room: '+this.state.room_name});
		this.setState({room_name: ''});
	}
	/************************************/

	/********* video conference *********/
	start(isCaller) {
		var room_name = this.state.room_name;

	  //pc will be created for both caller and answerer
	  pc = new RTCPeerConnection(configuration);


		// send any ice candidates to the other peer
	  pc.onicecandidate = function (evt) {
		  socket.emit('sendCandidate', room_name, (JSON.stringify({ "candidate": evt.candidate })));
	  };

		// once remote stream arrives, show it in the remote video element
	  pc.onaddstream = function (evt) {      
	    $("#peer-camera video")[0].src = URL.createObjectURL(evt.stream);
	  };

		// get the local stream, show it in the local video element and send it
	  navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
      $("#my-camera video")[0].src = URL.createObjectURL(stream);
	    pc.addStream(stream);
		  if (isCaller){
		    pc.createOffer(gotDescription, function(err) { console.log('error: ', err); });          
		  } else {
	      pc.createAnswer(gotDescription, function(err) { console.log('error: ', err); });          
	    }

      localStream = stream;

		  function gotDescription(desc) {
		    pc.setLocalDescription(desc);
	      socket.emit('sendDescription', room_name, JSON.stringify({ "sdp": desc }));
	    };
	  });
	}
	startCall() {
		this.start(true);
	}

	stopCall(isStopper) {
    if (isStopper) {
      socket.emit('stopCall', this.state.room_name);
    }
    pc.removeStream(localStream);
    localStream.getVideoTracks()[0].stop();

	}

	handleDescription(evt) {
		if (!pc) {
		  this.start(false);      
	  }
    var description = (JSON.parse(evt)).sdp;
	  pc.setRemoteDescription(new RTCSessionDescription(description));
	}

	handleCandidate(evt) {

		if (!pc) {
		  this.start(false);
		}
		var candidate = (JSON.parse(evt)).candidate;
		pc.addIceCandidate(new RTCIceCandidate(candidate));

	}
	/************************************/	
  render() {
    return (
    	<div className="row">

    		<div className="col-sm-4 col-md-3 sidebar">
    			videos here
    			<div id="my-camera">
    				<video autoPlay muted="muted"></video>
    			</div>

    			<button onClick={this.startCall} >Start call</button>
    			<button  onClick={this.stopCall.bind(this, true)} >Stop call</button>

    			<div id="peer-camera">
    				<video width="400" height="400" autoPlay></video>
    			</div>    			
    		</div>

    		<div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
    			<h2>Collaborate</h2>
    						<h4>{this.state.info}</h4>
							  <div className="row">
						      <form className="col-5" id="roomForm" onSubmit={this.handleCreateRoom}>
							      <input id="roomName" onChange={this.handleFormChange} type="text" name="roomName" placeholder="room name" />
							      <input type="submit" value="Submit" />
							    </form>

							    <form className="col-5" id="joinRoomForm" onSubmit={this.handleJoinRoom}>
							      <input id="roomName" onChange={this.handleFormChange} type="text" name="roomName" placeholder="room name" />
							      <input type="submit" value="Join" />
							    </form>    

							    <button onClick={this.exitRoom}>Stop Connection</button>
							  </div>

    			<div className="panel panel-default">
					  <div className="panel-heading">
					    <h3 className="panel-title">Live Coding</h3>
					  </div>
					  <div className="panel-body">
							
							  <div className="btn-group" role="group" aria-label="...">
								  <button onClick={this.handleReset} type="button" id="reset" className="btn btn-default">Clear</button>
								  <button onClick={this.handleRunCode} type="button" id="run" className="btn btn-default">Run</button>
								</div>

							  <div id="editor" ref="root" ></div>								
					  </div>
					</div>

					<div className="panel panel-default">
					  <div className="panel-body">
					    <div id="result">{this.state.code}</div>
					  </div>
					</div>
					
    		</div>
    	</div>
    )
  }
}