import React from 'react'
import { Link } from 'react-router'

var Helpers = React.createClass({
  
  renderHelpers: function(key) {
    return ( 
      
      <div className="row">
        <div className="col-sm-9 col-md-9">
          {this.props.details.helpers[key]}
        </div>
        <div className="col-sm-8 col-md-3">
          <Link to="/collaborate">Accept</Link>
        </div>
      </div>

    )
  },
  //pass down all helpers here and map it
  checkHelpers: function() {
    //check helper object
    if (this.props.details.helpers) {
      return(
        <table className="table">
          <tbody>
            { Object.keys(this.props.details.helpers).map(this.renderHelpers) }
          </tbody>
        </table>
      )
    } else {
      return(<div/>)
    }
  },
  
  componentDidMount: function() {
    // console.log('In Helpers.js', this.props);
  },

  render: function() {
    return (
      <div className="bg-success">
        { this.checkHelpers() } 
      </div>
    )
  }
})

export default Helpers