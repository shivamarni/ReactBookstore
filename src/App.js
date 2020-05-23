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
import Register from "./Components/Registration.jsx";
import Login from "./Components/Login.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import Books from "./Components/Books.jsx";

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
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route
            path="/user/resetpassword/:token"
            component={ResetPassword}
          ></Route>

          <Route path="/verify/:token" component={VerifyEmail}></Route>
          <Route path="/books" component={Books}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
