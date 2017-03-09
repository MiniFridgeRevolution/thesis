import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Closed Questions</h2>
        <div className="panel panel-default">
          <div className="panel-body">

            { /* QuestionItem.js */}
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><h4>How do I update the user's model fields in Django?</h4></td>
                </tr>
                <tr>
                  <td><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p></td>
                </tr>
                <tr>
                  {/*<td>Edit | Remove</td>*/}
                </tr>
              </tbody>
            </table>

            { /* QuestionItem.js */}
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><h4>how to use a complicated results from paste inside data.table's “i” part?</h4></td>
                </tr>
                <tr>
                  <td><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p></td>
                </tr>
                <tr>
                  {/*<td>Edit | Remove</td>*/}
                </tr>
              </tbody>
            </table>

            { /* QuestionItem.js */}
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><h4>Dynamically change supervisor node to null</h4></td>
                </tr>
                <tr>
                  <td><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p></td>
                </tr>
                <tr>
                  {/*<td>Edit | Remove</td>*/}
                </tr>
              </tbody>
            </table>

          </div>
        </div>


      </div>
    )
  }
})
