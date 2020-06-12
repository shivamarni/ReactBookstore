import React, { Component } from "react";
import { Paper, Button, Popover, Snackbar } from "@material-ui/core";
import CartController from "../Controller/CartController";

class GetBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperElevation: 1,
      item: this.props.item,
      descOpen: false,
      snackMessage: "",
      open: false,
      addedToCart: false,
    };
    //this.handleAddToBagClick = this.handleAddToBagClick.bind(this);
    //this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState = {
      item: props.item,
      cartArray: props.cartArray,
      inCart: props.inCart,
      cartCount: props.cartCount,
    };
  }

  handleClose = () => {
    this.setState((currentState) => {
      return { open: !currentState.open };
    });
  };
  handleAddToBagClick = () => {
    let token = localStorage.getItem("UserToken");
    if (token) {
      CartController.addToBag(this.state.item.bookId).then((res) => {
        console.log("response is======>", res);
        if (res.data != null) {
          console.log("in If block");
          this.setState({
            open: !this.state.open,
            snackMessage: res.data.message,
            addedToCart: !this.state.addedToCart,
          });
          this.props.getCartArray();
          this.props.cartCount();
        }
        console.log("addedticart", this.state.addedToCart);
      });
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  handleWishlistClick = async () => {
    let token = localStorage.getItem("UserToken");
    if (token) {
      CartController.addToWishlist(this.state.item.bookId).then((res) => {
        if (res.status === 200) {
          this.props.getwishlistarray();
          this.setState({
            open: true,
            snackMessage: "book added to wishlist",
            addToWishlist: true,
          });
        }
      });
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  render() {
    console.log(this.state.open);

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={1500}
          key={new Date().getTime()}
          open={this.state.open}
          onClose={this.handleClose}
          message={this.state.snackMessage}
        />
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
              {this.state.addedToCart ? (
                <Button
                  id="div-bagbutton1"
                  onClick={() => this.handleAddToBagClick()}
                >
                  Added To Bag
                </Button>
              ) : (
                <Button
                  id="div-bagbutton"
                  onClick={() => this.handleAddToBagClick()}
                >
                  Add To Bag
                </Button>
              )}
              <Button
                id="div-wishlistbutton"
                variant="outlined"
                onClick={this.handleWishlistClick}
              >
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
