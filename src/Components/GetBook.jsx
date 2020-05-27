import React, { Component } from "react";
import { Paper, Button, Popover } from "@material-ui/core";
import CartController from "../Controller/CartController";

class GetBook extends Component {
  constructor(props) {
    super(props);

    this.state = { paperElevation: 1, item: this.props.item, descOpen: false };
  }

  componentWillReceiveProps(props) {
    this.setState = {
      item: props.item,
      cartArray: props.cartArray,
      inCart: props.inCart,
    };
  }

  handleAddToBagClick = async () => {
    let token = localStorage.getItem("UserToken");
    if (token) {
      await CartController.addToBag(this.state.item.bookId).then((res) => {
        if (res.status === 200) {
          alert("book added to cart");
          this.props.getCartArray();
        }
      });
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  render() {
    return (
      <div>
        <Paper elevation={1} id="paper-book">
          <Paper elevation={1} id="paper-book-below">
            <div className="book-img-div">
              <img src={this.state.item.bookImage} className="book-image" />
            </div>
          </Paper>
          <div className="outer-details-div">
            <div className="div-bookname">{this.state.item.bookName}</div>
            <div className="div-author">by {this.state.item.bookAuthor}</div>
            <div className="div-price">Rs. {this.state.item.bookPrice}</div>
            <div className="div-quantity">
              books left {this.state.item.noOfBooks}
            </div>
            <div className="div-buttons">
              <Button id="div-bagbutton" onClick={this.handleAddToBagClick}>
                Add To Bag
              </Button>
              <Button id="div-wishlistbutton" variant="outlined">
                Wishlist
              </Button>
            </div>
          </div>
        </Paper>
        <Popover open={this.state.descOpen}></Popover>
      </div>
    );
  }
}

export default GetBook;
