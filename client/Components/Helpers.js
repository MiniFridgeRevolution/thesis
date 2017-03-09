import React from 'react';
import { Link } from 'react-router';
import HelperAcceptButton from './HelperAcceptButton';

var Helpers = React.createClass({
  
  componentDidMount: function() {
    // console.log('In Helpers.s DidMount this.props', this.props);
    // console.log('In Helpers.s DidMount this.props.details', this.props.details);
  },

  renderHelpers: function(helperObject) {
    //for each object in the array
    //so checkHelpers needs to call this for every element in the array
    // console.log('helperObject', helperObject);
    
    var helperProfileLink = '/profile/' + helperObject.helperId;

    return ( 
      <span>
          <p><Link to={ helperProfileLink }>{ helperObject.helperName }</Link> wants to help you. &nbsp;
          <HelperAcceptButton 
              details={this.props.details} 
              acceptHelper={this.props.acceptHelper} />
          </p>
      </span>

    );
  },
  //pass down all helpers here and map it
  checkHelpers: function() {
    //check if helper array of objects exists
    if (this.props.details.helpers) {
      
      var helpersArray = this.props.details.helpers;
      // console.log('helpersArray', helpersArray);
      return (
        <span>
          { helpersArray.map(this.renderHelpers) }
        </span>
      );
    } else {
      return (<div/>);
    }
  },

  render: function() {
    return (
      <span>
        { this.checkHelpers() } 
      </span>
    );
  }
});

export default Helpers;