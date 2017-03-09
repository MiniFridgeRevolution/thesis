import React from 'react';

export default class PostQuestionButton extends React.Component {
  render() {
    // console.log('showButton is', this.props.showButton);
    // console.log('showQuestionForm', this.props.showQuestionForm);
    if (this.props.showButton === true) {
      return (
        <div>
          <p><a onClick={this.props.showQuestionForm} className="btn btn-primary btn-fill btn-lg" role="button">Post a question...</a></p>
          <p>&nbsp;</p>
        </div>    
      );
    } else {
      return (<div></div>);
    }
  }
}
