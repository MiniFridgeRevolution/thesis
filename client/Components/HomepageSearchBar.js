import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-1"/>
            <div className="col-md-10 main">
              <h1>Lend a Hacking Hand</h1>
              <p>Help those who are in hacking needs</p>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for questions to answer..."/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">Go!</button>
                </span>
              </div>
            </div>
            <div className="col-md-1"/>
          </div> 
        </div>
      </div>
    )
  }
})
