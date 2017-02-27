import React from 'react'
import style from '../sass/PostQuestion.scss';

var QuestionItemPage = React.createClass({

  processQuestion: function() {
     // event.preventDefault();
     console.log('form submit');
     // console.log(event);
     // console.log('inside processQuestion function',this.refs);
     //1. take data from form
     // var questionData = {
     //  questionTitle: this.refs.questionTitle.value,
     //  questionBody: this.refs.questionBody.value
     // }
     // //2. add question back to App
     // this.props.addQuestion(questionData);

     // //3. reset the form
     this.refs.questionForm.reset();
  },

  componentDidMount: function() {
    console.log('inside DidMount', this.refs);
  },

  render: function() {
    return (
      <div className="row">
      <div className="col-sm-1 col-md-1"/>
      
      <div className="col-sm-10 col-md-10 main">

        <div className="panel panel-default">
          <div className="panel-body grey noPadding">
            
            <form ref="questionForm" onSubmit={this.processQuestion}>
              
              <div className="form-group">
                <h3>Question</h3>
                <h4>Lerner: Ai Shi</h4>
                <label>Title</label>
                <input ref="questionTitle" type="text" className="form-control" placeholder="" required/>
              </div>

              <div className="form-group">
                <label>Question</label>
                <textarea ref="questionBody" className="form-control" rows="5" required></textarea>
              </div>

              <p><button className="btn btn-primary" type="submit" id="submit">Claim</button> &nbsp;
                 <Link to="/" className="btn btn-default" role="button">Cancel</a>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
    )
  }
});

export default QuestionItemPage

