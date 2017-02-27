import React from 'react'
import QuestionItem from './QuestionItem'

var OpenQuestions = React.createClass({
  
  renderQuestion: function(key) {
    // console.log(this.props.questions);
    return ( <QuestionItem 
                key={key} 
                index={key} 
                userCurrent={this.props.userCurrent}
                details={this.props.questions[key]} 
                claimQuestion={this.props.claimQuestion}/> 
            )
  },
  componentDidMount: function() {
    console.log('Inside OpenQuestions', this.props.questions);
  },
  render: function() {
    return (
      <div>
        <h3>Open Questions</h3>
        <div className="panel panel-default">
          <div className="panel-body">
            { Object.keys(this.props.questions).map(this.renderQuestion) }
          </div>
        </div>


      </div>
    )
  }

})

export default OpenQuestions

