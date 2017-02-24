import React from 'react'
// import ace from 'brace'


export default class Collaborate extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {		
		var socket = io.connect();

		/*********** live coding *********/
		var editor = ace.edit(this.refs.root);
		var applyingChanges = false;
    // editor.getSession().setMode("ace/mode/javascript");
    var username = prompt("what is your name?");

    socket.on('connect', function(){
    	console.log('connected');
    	socket.emit('adduser', username);

      socket.on('welcome', function(msg) {
        $('#result').append($('<p>').text(msg));
      });
      socket.on('room-exists', function(msg) {
        alert(msg);
      })
    });
    // addroom
    var room_name;
    $('#roomForm').submit(function(e) {
        e.preventDefault();
        room_name = $(this).find('input:text').val();
        // console.log('submit a new room_name: ', room_name);
        socket.emit('addroom', room_name);
    });
    // join room
    $('#joinRoomForm').submit(function(e) {
        e.preventDefault();
        room_name = $(this).find('input:text').val();
        // console.log('join a room_name: ', room_name);
        socket.emit('join-room', room_name);
    });
    // changes in editing board
    editor.getSession().on('change', function(e) {
        if (!applyingChanges) {
            socket.emit('editor-content-changes', room_name, JSON.stringify(e));
            // console.log('editor-content-changes: ', room_name, JSON.stringify(e));
        }
        return false;
    });
    socket.on('editor-content-changes', function(val) {
        applyingChanges = true;
        val = JSON.parse(val);
        // console.log('socket on content changes, ', [val]);
        editor.getSession().getDocument().applyDeltas([val]);
        applyingChanges = false;
    });
    // 'run code'
    $('#run').on('click', function() {
        var val = editor.getValue();
        socket.emit('submit-val', room_name, val);
        // console.log('submit-val', room_name, val);
        return false;
    });

    socket.on('submit-val', function(val) {
    	applyingChanges = true;
    	$('#result').append($('<p>').text(val));
    	// console.log('socket on editor submit', val);
    	applyingChanges = false;
    });
		/**************************************/

		// ********** video conference ********

		var signalingChannel = socket;
		var pc;

		var configuration = {
		  'iceServers': [{
		    'url': 'stun:stun.l.google.com:19302'
		  }]
		};

		// run start(true) to initiate a call
		function start(isCaller) {

		  //pc will be created for both caller and answerer
		    pc = new RTCPeerConnection(configuration);
		    console.log('set pc: ', pc);

		    // send any ice candidates to the other peer
		    pc.onicecandidate = function (evt) {
		      console.log('send ice candidates:', evt);

            signalingChannel.emit('sendCandidate', room_name, (JSON.stringify({ "candidate": evt.candidate })));

		    };

		    // once remote stream arrives, show it in the remote video element
		    pc.onaddstream = function (evt) {
		      console.log('adding remote stream');
		      
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


		      function gotDescription(desc) {
		          pc.setLocalDescription(desc);

		          signalingChannel.emit('sendDescription', room_name, JSON.stringify({ "sdp": desc }));
		      }
		    });
		}



		signalingChannel.on('description', function (evt) {
		    if (!pc) {
		      start(false);      
		    }

		    var description = (JSON.parse(evt)).sdp;

		    console.log('setting remote description');
		    pc.setRemoteDescription(new RTCSessionDescription(description));

		});

		signalingChannel.on('candidate', function (evt) {
		  if (!pc) {
		    start(false);
		  }

		  var candidate = (JSON.parse(evt)).candidate;

		  pc.addIceCandidate(new RTCIceCandidate(candidate));
		})


		$("#start-call").click(function() {
		    start(true);
		});

	}

	createRoom() {

	}


  render() {
  	var style_A = {width: '640px', height: '440px'};
  	var style_B = {width: "200px", height: "200px", border: "#000 1px solid"};
    return (
    	<div className="row">

    		<div className="col-sm-4 col-md-3 sidebar">
    			videos here
    			<div id="my-camera">
    				<video style={style_B} autoPlay muted="muted"></video>
    			</div>

    			<button id="start-call">Start call</button>

    			<div id="peer-camera">
    				<video width="400" height="400" autoPlay></video>
    			</div>    			
    		</div>

    		<div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
    			<h2>Collaborate</h2>
    			<div>
				    <h3>live coding panel</h3>
					</div>
					<div>
						<div className="btn-group" role="group" aria-label="...">
						  <button type="button" id="changeTheme" className="btn btn-default">Change theme</button>
						  <button type="button" id="reset" className="btn btn-default">Clear</button>
						  <button type="button" id="run" className="btn btn-default">Run</button>
						</div>
					</div>
					<div>
					  <div>
				      <form id="roomForm">
					      <input id="roomName" type="text" name="roomName" placeholder="room name" />
					      <input type="submit" value="Submit" />
					    </form>

					    <form id="joinRoomForm">
					      <input id="roomName" type="text" name="roomName" placeholder="room name" />
					      <input type="submit" value="Join" />
					    </form>    

					  </div>
					  <div id="editor" ref="root" style={style_A}></div>
					  <div id="result">this is result</div>
					</div>
    		</div>
    	</div>
    )
  }
}