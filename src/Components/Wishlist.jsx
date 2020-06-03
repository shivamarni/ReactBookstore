import React, { Component } from "react";
import { Divider, Card } from "@material-ui/core";
import Header from "../Components/Header.jsx";
import Controller from "../Controller/BooksController";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WishlistBook from "../Components/WishlistBook";
import BooksController from "../Controller/BooksController";
import CartController from "../Controller/CartController";
import "../CSS/books.scss";

class Wishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookArray: [],
      profile: null,
      cartCount: 0,
      wishlistCount: 0,
      wishlistArray: [],
      cartArray: [],
    };
  }
  componentDidMount() {
    this.getCartBooks();
    this.getwishlistarray();
    this.getapprovedbooks();
  }

  getapprovedbooks = async () => {
    await BooksController.getallapprovedbooks().then((res) => {
      this.setState({ bookArray: res.data.data });
    });
  };

  getwishlistarray = async () => {
    await CartController.getallwishlist().then((res) => {
      if (res.status === 200) {
        console.log("inside approved books");
        this.setState({
          wishlistArray: res.data.data,
        });
        console.log("hit get all wishlist successfully");
      }
    });
  };

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

  render() {
    let displayBooks = this.state.bookArray.map((item) => {
      console.log("inside wishlistbook", this.state.wishlistArray.length);
      if (this.state.wishlistArray.length !== 0) {
        for (let j = 0; j < this.state.wishlistArray.length; j++) {
          let bool = this.state.wishlistArray[j].bookId === item.bookId;
          if (bool) {
            console.log("inside wishlistbook", item);
            return (
              <div>
                <WishlistBook
                  item={item}
                  inCart={false}
                  inWishlist={true}
                  getcartarray={this.getcartarray}
                  getwishlistarray={this.getwishlistarray}
                  key={item.bookId}
                />
                <div className="divider-wishlist">
                  <Divider />
                </div>
              </div>
            );
          }
        }
      }
    });
    return (
      <div className="page-container">
        <Header
          cartCount={this.state.cartCount}
          wishlistCount={this.state.wishlistCount}
        />
        <div className="outerdiv-books">
          <div className="content-div">
            <div className="wishlist-heading-div">
              <div className="wishlist-inner-div1">
                <div className="wishlist-logo-div">
                  <FavoriteIcon fontSize="medium" />
                </div>
                <div className="mywishlist-div">My Wishlist ()</div>
              </div>
            </div>
            <div className="content-wrapper1">{displayBooks}</div>
          </div>
          <Card id="footer-card">
            <footer className="footer">
              <div className="footer-text">
                Copyright © 2020,Bookstore Private Limited.All Rights Reserved
              </div>
            </footer>
          </Card>
        </div>
      </div>
    );
  }
}

export default Wishlist;
