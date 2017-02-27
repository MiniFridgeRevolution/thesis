import React from 'react'
import axios from 'axios'

export default class Signup extends React.Component{
  constructor(props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup() {

    // axios.get('/auth/github')

    console.log('Signup clicked');
    var username = $('#username').val();
    var email = $('#email').val();
    var data = {
        username: username,
        email: email
      };
    axios.post('/users', data).then( function(response) {
      console.log('inside signup then');
      console.log('signup response', response);
    });

  }

  render() {
    return (
      <div>
          <h2> Make an account with us! </h2>

          <a href="/auth/github">Sign up with github </a>

          <form onSubmit={this.handleSignup}>
            Username: 
            <input type="textarea" id="username"></input>
            Email: 
            <input type="textarea" id="email"></input>
            <input type="submit" value="submit" />
          </form>

      </div>
  )}
}