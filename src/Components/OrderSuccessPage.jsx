import React, { Component, Fragment } from "react";
import classes from "../CSS/OrderSuccessPage.module.scss";
import success from "../IMG/Success2x.png";
import { Button } from "@material-ui/core";
import Header from "./Header";
import CartController from "../Controller/CartController";
import Controller from "../Controller/BooksController";

class OrderSuccessPage extends Component {
  state = {
    cartlist: [],
    orderDetails: [],
    wishlistArray: [],
    orderId: 1111,
  };

  componentDidMount() {
    this.getCartBooks();
    //this.getwishlistarray();
    this.incrementOrderId();
  }

  incrementOrderId = () => {
    this.setState({
      orderId: this.state.orderId + 1,
    });
  };
  //   getwishlistarray = async () => {
  //     await Controller.getallwishlists().then((res) => {
  //       if (res.status === 200) {
  //         this.setState({
  //           wishlistArray: res.data.object,
  //         });
  //       }
  //     });
  //   };

  getCartBooks = async () => {
    await CartController.getCartBooks()
      .then((response) => {
        console.log(response.data.data);
        console.log(this.state.cartlist);
        this.setState({
          cartlist: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  goToBookStore = () => {
    this.props.history.push("/books");
  };

  render() {
    return (
      <Fragment>
        <Header
          cartCount={this.state.cartlist.length}
          //wishlistCount={this.state.wishlistArray.length}
        />
        <div className={classes.OrderSuccessPage}>
          <div className={classes.OrderPlaced}>
            <img
              className={classes.OrderPlacedImg}
              src={success}
              alt="success"
            />
            <div className={classes.OrderText}>order placed successfully</div>
            <div className={classes.OrderSummery}>
              hurray!!! your order is confirmed the order id is #
              {/* {this.props.location.state} */ this.state.orderId + 1}
              save the order id for further communication..
            </div>
            <table>
              <tbody>
                <tr>
                  <th className={classes.Email}>Email Us</th>
                  <th>Contact Us</th>
                  <th>Address</th>
                </tr>
                <tr>
                  <td>admin@bookstores.com</td>
                  <td>+91 7777766666</td>
                  <td>
                    187 D DHF Building 6th cross Electronic City Bangalore
                    560040
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={classes.ContinueShopping}>
              <Button
                onClick={this.goToBookStore}
                className={classes.ContinueShoppingButton}
                variant="contained"
                color="primary"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <footer className={classes.Footer}>
          <p>
            Copyright © 2020, Bookstore Private Limited. All Rights Reserved
          </p>
        </footer>
      </Fragment>
    );
  }
}

export default OrderSuccessPage;
