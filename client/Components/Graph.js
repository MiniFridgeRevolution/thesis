import React from 'react'
import axios from 'axios'

export default class Collaborate extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    axios.get('/graph2')
      .then(function(response){
      $('#chart-img-container').append(response.data);
    });
  }

  render() {
    return (
      <div id="chart-img-container">
      </div>
    )
  }
}
