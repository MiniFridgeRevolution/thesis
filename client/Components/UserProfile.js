import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <h2>{this.props.userCurrent.name}</h2>
          <p>{this.props.userCurrent.description}</p>
        </div>
      </div>
    )
  }
})
