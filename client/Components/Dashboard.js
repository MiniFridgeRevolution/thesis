import React from 'react'
import { Link } from 'react-router'
import NavLink from './NavLink'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'
import { browserHistory } from 'react-router'

export default React.createClass({

  componentDidMount() {
    console.log('In Dashboard props',this.props);
  },

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <LeftColumn userCurrent={this.props.userData.user} />
          <RightColumn userCurrent={this.props.userData.user} questions={this.props.userData.questions} questionsClaimed={this.props.userData.questionsClaimed} addQuestion={this.props.addQuestion} />
        </div>
      </div>
    )
  }
})
