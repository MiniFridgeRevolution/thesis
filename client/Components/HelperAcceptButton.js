import React from 'react';

var HelperAcceptButton = React.createClass({

  componentDidMount: function() {
    // console.log('In HelperAcceptButton', this.props);
  },

  // checkStatus: function() {
  //   //check question status
  //   if (this.props.details.status === 'open' ) {
  //     return(
  //       <form>
  //         <button onClick={() => this.props.claimQuestion(this.props.userCurrent.id,this.props.details.id)} className="btn btn-default" role="button">Claim</button>
  //       </form>
  //     )
  //   } else {
  //     return(<div/>)
  //   }
  // },

  render: function() {
    // console.log('showButton is', this.props.showButton);
    // console.log('showQuestionForm', this.props.showQuestionForm);
    return (
      <span>
        
          <button 
            onClick={() => 
              this.props.acceptHelper(
                this.props.details.learnerId, 
                this.props.details.helperId, 
                this.props.details.id
              )
            } className="btn btn-success btn-fill" role="button">Accept
            </button>
        
      </span>
    );
  }
});

export default HelperAcceptButton;
