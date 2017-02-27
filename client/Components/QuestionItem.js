import React from 'react'
import Helpers from './Helpers'
import ClaimQuestionButton from './ClaimQuestionButton'

var QuestionItem = React.createClass({
  //do conditional rendering
  
  componentDidMount: function() {
    console.log('inside QuestionItem props', this.props);
  },
  
  isClaimed: function() {
    if (this.props.details.name) {
      return (<span>Asked by {this.props.details.name} </span>) 
    }
  },

  //if helper's children exist, then render the Helpers component
  render: function() {
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td><h4><a href="">{this.props.details.title}</a></h4></td>
            </tr>
            <tr>
              <td><p>{this.props.details.question}</p></td>
            </tr>
          </tbody>
          
          <div className="row">
            <div className="col-sm-9 col-md-9">
              <ClaimQuestionButton 
                details={this.props.details}
                userCurrent={this.props.userCurrent}
                claimQuestion={this.props.claimQuestion}/>
            </div>
            <div className="col-sm-8 col-md-3">
              {this.isClaimed()}
            </div>
          </div>

        </table>


        <Helpers details={this.props.details} />

      </div>
    )
  }
})

export default QuestionItem