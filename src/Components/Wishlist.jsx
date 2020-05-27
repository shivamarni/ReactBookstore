import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import NavBar from "../Components/NavBar";
import Controller from "../Controller/BooksController";
import FavoriteIcon from "@material-ui/icons/Favorite";
import WishlistBook from "../Components/WishlistBook";
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
    this.getcartarray();
    this.getwishlistarray();
    this.getallapprovedbooks();
  }

  getallapprovedbooks = async () => {
    await Controller.getbooks().then((res) => {
      if (res.status === 200) {
        this.setState({ bookArray: res.data.object });
      }
    });
    console.log("manu bookarray:", this.state.bookArray);
  };

  getwishlistarray = async () => {
    await Controller.getallwishlists().then((res) => {
      if (res.status === 200) {
        this.setState({
          wishlistArray: res.data.object,
          wishlistCount: res.data.object.length,
        });
      }
    });
    console.log("manu Wishlistarray:", this.state.wishlistArray);
  };

  getcartarray = async () => {
    await Controller.getallcarts().then((res) => {
      if (res.status === 200) {
        this.setState({
          cartArray: res.data.object,
          cartCount: res.data.object.length,
        });
      }
    });
  };

  render() {
    let displayBooks = this.state.bookArray.map((item) => {
      if (this.state.wishlistArray.length !== 0) {
        for (let j = 0; j < this.state.wishlistArray.length; j++) {
          let bool = this.state.wishlistArray[j].bookId === item.bookId;
          if (bool) {
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
        <NavBar
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
            <div className="content-wrapper">{displayBooks}</div>
          </div>

          <footer className="footer">
            <div className="footer-text">
              Copyright © 2020,Bookstore Private Limited.All Rights Reserved
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Wishlist;
