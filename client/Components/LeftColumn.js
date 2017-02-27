import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="col-sm-4 col-md-3 sidebar">
      
        <div className="row placeholders">
          <div className="placeholder">
            <img src={this.props.userCurrent.profileImage} width="200px"/>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <td>Overall</td>
                <td>Stars</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Knowledge</td>
                <td>Stars</td>
              </tr>
              <tr>
                <td>Helpfulness</td>
                <td>Stars</td>
              </tr>
              <tr>
                <td>Overall Experience</td>
                <td>Stars</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    )
  }
})
