import React from 'react'
import { Link } from 'react-router'
import style from '../sass/NavLink.scss';

export default React.createClass({
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand logo">Hackeroos</Link>
          </div>
          
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/about">How it works</Link></li>
              <li><Link to="/graphs">View coding trends</Link></li>
              <li><Link to="/dashboard">My account</Link></li>
              <li><Link to="/collaborate">Collaborate</Link></li>
              <li><a className="btn" href="#" role="button">Sign up</a> </li>
              <li><a className="btn" href="#" role="button">Log in</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
})
