import React from 'react'
import axios from 'axios'

export default React.createClass({

  clickHandler(){
    axios.get('/search?term=hello')
      .then(function(response){
      console.log("searchResp: ", response.data[0].title);
    });
  },

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
                  <button className="btn btn-default" type="button" onClick={this.clickHandler}>Go!</button>
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
