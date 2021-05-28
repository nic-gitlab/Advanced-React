import React from "react"
import { Route, Switch, BrowserRouter } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import ArticlesList from "./ArticlesList"
import ArticleShow from "./ArticleShow"

// This is for meets expectations

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ArticlesList} />
        <Route exact path="/articles/:id" component={ArticleShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
