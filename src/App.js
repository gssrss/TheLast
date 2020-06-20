import React, { Component } from "react"
import fire from "./config/fire"
import Home from "./Home"
import Login from "./Login"
//import { Route } from "react-router"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
//import { Redirect } from "react-router"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap-css-only/css/bootstrap.min.css"
import "mdbreact/dist/css/mdb.css"
// import { Router, Route, Link } from "react-router-dom"
// import history from "./history"
import Covid19 from "./Covid19"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    this.authListener()
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      //console.log(user)
      if (user) {
        this.setState({ user })
        //localStorage.setItem("user", user.uid)
      } else {
        this.setState({ user: null })
        //localStorage.removeItem("user")
      }
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/Home"
              exact
              strict
              render={() => (this.state.user ? <Home /> : <Redirect to="/" />)}
            />
            <Route path="/" exact component={Login} />
            <Route path="/Covid" exact component={Covid19} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
