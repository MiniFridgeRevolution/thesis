import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import About from './About'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'
import Dashboard from './Dashboard'
import Collaborate from './Collaborate'
import Graph from './Graph'
import PostQuestionPage from './PostQuestionPage'


module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    
    <Route path="/dashboard" component={Dashboard}/>
    <Route path="/post-question" component={PostQuestionPage}/>

    <Route path="/about" component={About}/>
    <Route path="/collaborate" component={Collaborate}/>
    <Route path="/graphs" component={Graph}/>
  </Route>
)
