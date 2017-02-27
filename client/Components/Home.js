import React from 'react'
import { Link } from 'react-router'
import OpenQuestions from './OpenQuestions'
import HomepageSearchBar from './HomepageSearchBar'
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super(); 

    this.state = {
      helloMessage: 'Welcome to Hackeroo! Sign in to collaborate.'
    }

  }

  // componentDidMount() {

  // }





  getDefaultProps() {
    console.log('getting our default properties');
  }

  //Before component is rendered
  componentWillMount() {
    console.log('Home component is mounting');
    // this.props.showSearch('yes');
  }

  //Happens after component has rendered
  componentDidMount() {
    console.log('Home component has rendered');
    var context = this;
    axios.get('/session').then( function(response) {
      console.log('inside response');
      console.log('response', response);
      if (response.data.username) {
        context.setState({'helloMessage': 'Hello, ' + response.data.username});
      }
    });

  }
  
  //Happens when component has rendered and about to unmount
  componentWillUnmount() {
    // this.props.showSearch('no');
  }

  //Happen whenever home component's state changes
  render() {
    console.log('Home component is rendered')
    return (
      <div className="row">
      <HomepageSearchBar/>
        <div className="col-sm-1 col-md-1"/>
        
        <div className="col-sm-10 col-md-10 main">
         <h1> {this.state.helloMessage} </h1>
        
          { /* OpenQuestions.js */}
          <OpenQuestions 
            userCurrent={this.props.userData.user}
            questions={this.props.userData.questions} 
            claimQuestion={this.props.claimQuestion} />

          { /* FindHelpers Compoent */}
          <div>
            <h3>Find Helpers</h3>
            <div className="panel panel-default">
              <div className="panel-body">

            
                <div className="row placeholders">
                  <div className="col-xs-6 col-sm-3 placeholder">
                    <img src="/photos/photo-ai.png" width="200px"/>
                    <h3><Link to="/dashboard">Ai Shi</Link></h3>
                    
                    <p>&nbsp;</p>
                    <p>Javascript (5)</p>
                    <p>HTML (5)</p>
                    <p>CSS (5)</p>
                    
                  </div>
                  <div className="col-xs-6 col-sm-3 placeholder">
                    <img src="/photos/photo-alison.png" width="200px"/>
                    <h3><Link to="/dashboard">Alison Reed</Link></h3>
                    
                    <p>&nbsp;</p>
                    <p>Javascript (5)</p>
                    <p>HTML (5)</p>
                    <p>CSS (5)</p>

                  </div>
                  <div className="col-xs-6 col-sm-3 placeholder">
                    <img src="/photos/photo-max.png" width="200px"/>
                    <h3><Link to="/dashboard">Max Quinn</Link></h3>
                    
                    <p>&nbsp;</p>
                    <p>Javascript (5)</p>
                    <p>HTML (5)</p>
                    <p>CSS (5)</p>

                  </div>
                  <div className="col-xs-6 col-sm-3 placeholder">
                    <img src="/photos/photo-hanyen.png" width="200px"/>
                    <h3><Link to="/dashboard">Hanyen Widjaja</Link></h3>
                    
                    <p>&nbsp;</p>
                    <p>Javascript (5)</p>
                    <p>HTML (5)</p>
                    <p>CSS (5)</p>

                  </div>
                </div>

              </div>
            </div>
                  
          </div>

        </div>

        
      </div>


      
    )
  }
}