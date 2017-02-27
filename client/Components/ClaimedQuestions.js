import React from 'react'
import { Link } from 'react-router'
import QuestionItem from './QuestionItem'

var ClaimedQuestions = React.createClass({

  renderQuestion: function(key) {
    // console.log(this.props.questionsClaimed);
    return ( <QuestionItem key={key} index={key} details={this.props.questionsClaimed[key]}/> )
  },
  componentDidMount: function() {
    console.log('Inside ClaimedQuestions', this.props.questions);
  },
  render: function() {
    return (
      <div>
        <h3>Claimed Questions</h3>
        <div className="panel panel-default">
          <div className="panel-body">
            { Object.keys(this.props.questionsClaimed).map(this.renderQuestion) }
          </div>
        </div>
      </div>
    )
  }
})

export default ClaimedQuestions