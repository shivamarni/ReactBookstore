import React, { Component, Fragment } from "react";
import CartDetails from "./CartDetails";
import classes from "../CSS/CartDetails.module.scss";

class Cart extends Component {
  render() {
    return (
      <Fragment>
        <CartDetails {...this.props} />
        <footer className={classes.Footer}>
          <p>
            Copyright © 2020, Bookstore Private Limited. All Rights Reserved
          </p>
        </footer>
      </Fragment>
    );
  }
}

export default Cart;
