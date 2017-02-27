import React from 'react'
import {Link, browserHistory} from 'react-router'
import axios from 'axios'
import UserProfile from './UserProfile'
import Skills from './Skills'
import PostQuestionButton from './PostQuestionButton'
import PostQuestion from './PostQuestion'
import ClaimedQuestions from './ClaimedQuestions'
import OpenQuestions from './OpenQuestions'
import ClosedQuestions from './ClosedQuestions'

export default class RightColumn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showButton: true
    }
  }

  componentWillMount() {
    console.log('inside RightColumn componentWillMount', this.props);
    //do ajax call to get Helpers (those who claim current user's questions)
    //right now do it in App because the dummy data state is there

  }

  render() {

    var showQuestionForm = function() {
      this.setState({
        showForm: true,
        showButton: false
      });
    }

    var hideQuestionForm = function() {
      this.setState({
        showForm: false,
        showButton: true
      });
    }

    return (
      <div className="col-sm-8 col-sm-offset-4 col-md-9 col-md-offset-3 main">
        <UserProfile userCurrent={this.props.userCurrent} />
        <Skills />
        <PostQuestionButton showButton={this.state.showButton} showQuestionForm={showQuestionForm.bind(this)} />
        <PostQuestion userCurrent={this.props.userCurrent} addQuestion={this.props.addQuestion} showForm={this.state.showForm} hideQuestionForm={hideQuestionForm.bind(this)}/>
        <ClaimedQuestions questionsClaimed={this.props.questionsClaimed} />
        <OpenQuestions questions={this.props.questions} />
        <ClosedQuestions />
      </div>
    )
  }
}
