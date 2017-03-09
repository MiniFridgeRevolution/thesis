import React from 'react';

var ClaimQuestionButton = React.createClass({

  componentDidMount: function() {
    // console.log('In CLaimButton', this.props.details);
  },

  checkStatus: function() {
    //check question status
    if (this.props.details.status === 'open' ) {
      return (
        
          <button onClick={() => this.props.claimQuestion(this.props.userCurrent.id, this.props.details.userId, this.props.details.id)} className="btn btn-success btn-fill" role="button">I can help</button>
        
      );
    } else {
      return (<div/>);
    }
  },

  render: function() {
    // console.log('showButton is', this.props.showButton);
    // console.log('showQuestionForm', this.props.showQuestionForm);
    return (
      <span>
        { this.checkStatus() } 
      </span>
    );
  }
});

export default ClaimQuestionButton;
