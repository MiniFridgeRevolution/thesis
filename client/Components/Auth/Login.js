import React from 'react'


import axios from 'axios'


export default class Login extends React.Component{
  constructor(props) {
    super(props);


    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn() {

    console.log('Login clicked');
    var username = $('#username').val();
    var email = $('#email').val();
    var data = {
        username: username,
        email: email
      };
    var context = this;

    axios.get('/users', {params: data}).then(function(response) {
      console.log('inside login then', response);
      
    })

  }

  render() {
    return (
      <div>

          <h2> Welcome back! </h2>
          <button onClick={this.handleLogIn}>Sign in with github </button>

          <h2> Welcome back! Log in: </h2>
          <form onSubmit={this.handleLogIn}>
            Username: 
            <input type="textarea" id="username"></input>
            Email: 
            <input type="textarea" id="email"></input>
            <input type="submit" value="submit" />
          </form>

      </div>
  )}
}