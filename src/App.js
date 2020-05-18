import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import logo from "./logo.svg";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/header" component={Header}></Route>
          <Route path="/footer" component={Footer}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
