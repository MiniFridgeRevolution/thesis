import React from 'react'

export default React.createClass({

  clickHandler(){
    console.log(document.getElementsByName("textbox1")[0].value);
    axios.get('/search?term=' + document.getElementsByName("textbox1")[0].value) //+ document.getElementsByName("textbox1")[0].value)
      .then(function(response){
      console.log("searchResp: ", response);
     // comp.setState({questions: response.data[0].title});
    })
  },

  render() {
    return (
      <div><div className="jumbotron heroImage">
      </div>
      
      <div className="container heroText">
        <div className="row">
          <div className="col-md-12 tim-typo">
            <h2><strong>Get Live Programming Help</strong></h2>
            <h4>... and help those with programming questions</h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for questions"/>
              <span className="input-group-btn">
                <button className="btn btn-default btn-fill" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div> 
      </div>

      </div>
    );
  }
});
