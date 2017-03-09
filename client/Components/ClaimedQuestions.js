import React from 'react';
import { Link } from 'react-router';
import QuestionItem from './QuestionItem';

var ClaimedQuestions = React.createClass({

  renderQuestion: function(key) {
    // console.log('Inside ClaimedQuestions renderQuestion', this.props.questionsClaimed);
    if (!this.props.questionsClaimed) {
      return (
        <div>
          <p>No one has claimed your questions yet</p>
        </div>
      );
    }
    return ( <QuestionItem 
                key={key} 
                index={key} 
                acceptHelper={this.props.acceptHelper} 
                details={this.props.questionsClaimed[key]}/> );
  },
  componentWillMount: function() {
    // console.log('Inside ClaimedQuestions this.props', this.props);

  },
  render: function() {
    return (
      <div>
        <h2>Claimed Questions</h2>
          <div>
            { Object.keys(this.props.questionsClaimed).map(this.renderQuestion) }
          </div>
      </div>
    );
  }
});

export default ClaimedQuestions;