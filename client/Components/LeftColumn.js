import React from 'react'
import ReactStars from 'react-stars'

export default React.createClass({
  render() {
    return (
      <div className="col-sm-4 col-md-3 sidebar">
      
        <div className="row placeholders">
          <div className="placeholder">
            <img src={this.props.userCurrent.profile_img} width="200px"/>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr>
                <td><p>Overall Rating</p></td>
                <td>
                  <ReactStars
                    
                    count={5}
                    half={false} 
                    edit={false} />
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td><p>Knowledge</p></td>
                <td>
                  <ReactStars
                    
                    count={5}
                    half={false}
                    edit={false}/>
                  </td>
              </tr>
              <tr>
                <td><p>Helpfulness</p></td>
                <td>
                  <ReactStars
                    
                    count={5}
                    half={false}
                    edit={false}/>
                </td>
              </tr>
              <tr>
                <td><p>Overall Experience</p></td>
                <td>
                  <ReactStars
                    
                    count={5}
                    half={false}
                    edit={false}/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    )
  }
})
