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
import AdminLogin from "./Components/AdminLogin.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import Books from "./Components/Books.jsx";
import SellerBooks from "./Components/SellerBook.jsx";
import AdminBooks from "./Components/AdminBooks.jsx";
import OrderSuccessPage from "./Components/OrderSuccessPage.jsx";
import Cart from "./Components/Cart.jsx";
import Wishlist from "./Components/Wishlist.jsx";

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
          <Route path="/adminLogin" component={AdminLogin}></Route>
          <Route path="/forgotPassword" component={ForgotPassword}></Route>
          <Route
            path="/user/resetpassword/:token"
            component={ResetPassword}
          ></Route>

          <Route path="/verify/:token" component={VerifyEmail}></Route>
          <Route path="/books" component={Books}></Route>
          <Route path="/sellerBooks" component={SellerBooks}></Route>
          <Route path="/adminbooks" component={AdminBooks}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/wishlist" component={Wishlist}></Route>
          <Route
            path="/bookstore/orderSuccessPage"
            component={OrderSuccessPage}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
