import React, { Component } from "react";
import {
  Paper,
  Button,
  Popover,
  IconButton,
  Snackbar,
  Divider,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CartController from "../Controller/CartController";
import { withRouter } from "react-router-dom";
import "../CSS/books.scss";

class WishlistBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperElevation: 1,
      item: this.props.item,
      descOpen: false,
      snackMessage: "",
      loginDialogOpen: false,
      cartArray: this.props.cartArray,
      inCart: this.props.inCart,
      inWishlist: this.props.inWishlist,
      open: false,
      snackMessage: "",
    };
    this.handleAddToBagClick = this.handleAddToBagClick.bind(this);
    this.removeFromWishlist = this.removeFromWishlist.bind(this);
  }
  componentDidMount() {}

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
      await CartController.wishlistToCart(this.state.item.bookId).then(
        (res) => {
          if (res.status === 200) {
            this.props.getwishlistarray();
            this.setState({
              open: true,
              snackMessage: "book added to cart",
              handleAddToBagClick: true,
            });
            // this.props.cartarray();
          }
        }
      );
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  handleDialogClose = async () => {
    await this.setState({
      loginDialogOpen: false,
    });
  };

  handleTokenFromDialog = async () => {
    await this.setState({
      loginDialogOpen: false,
    });
  };

  removeFromWishlist = async () => {
    let token = localStorage.getItem("UserToken");
    if (token) {
      await CartController.removeFromWishlist(this.state.item.bookId).then(
        (res) => {
          if (res.status === 200) {
            this.props.getwishlistarray();
            this.setState({
              open: true,
              snackMessage: "book removed from wishlist",
              removeFromWishlist: true,
            });
          }
        }
      );
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  render() {
    return (
      // <div className="wishlist-main-div">

      <div id="paper-book">
        <Paper elevation={1} id="paper-book-below">
          <div className="book-img-div">
            <img src={this.state.item.bookImage} className="book-image" />
          </div>
          {this.state.item.noOfBooks === 0 && (
            <div className="outofstock-div">
              <Paper id="outofstock">
                <div className="outofstock-text">OUT OF STOCK</div>
              </Paper>
            </div>
          )}
          {this.state.item.noOfBooks > 0 && this.state.item.noOfBooks < 5 && (
            <div className="outofstock-div">
              <Paper id="hurryfewleft">
                <div className="outerdiv-hurry">
                  <div className="hurry-div">HURRY!</div>
                  <div className="onlyfewleft-div">
                    Only {this.state.item.noOfBooks} books left
                  </div>
                </div>
              </Paper>
            </div>
          )}
        </Paper>
        <div className="div-bookname">{this.state.item.bookName}</div>
        <div className="div-author">by {this.state.item.bookAuthor}</div>
        <div className="div-price">Rs. {this.state.item.bookPrice}</div>
        <div className="div-quantity">
          books left {this.state.item.noOfBooks}
        </div>
        {/* <div>
          <div className="outer-details-div">
            <div className="div-bookname-wishlist">
              <div className="div-wishlistbookname-wishlist">
                {this.state.item.bookName}
              </div>
            </div>

            <div className="div-authorwishlist-wishlist">
              by {this.state.item.bookAuthor}
            </div>
            <div className="div-price-wishlist">
              Rs. {this.state.item.bookPrice}
            </div>
          </div>
        </div> */}
        {/* <div className="div-buutons">
          <div className="div-outerbuttons1">
            <div className="div-addtobag-wishlist">
              <Button id="div-bagbutton" onClick={this.handleAddToBagClick}>
                Add To Bag
              </Button>
            </div>
            <Button
              id="div-wishlistbutton"
              variant="outlined"
              onClick={this.removeFromWishlist}
            >
              Remove
            </Button>
          </div>
        </div> */}
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
        <div className="div-buttons1">
          <Button id="div-bagbutton" onClick={this.handleAddToBagClick}>
            Add To Bag
          </Button>
          <Button
            id="div-wishlistbutton"
            variant="outlined"
            onClick={this.removeFromWishlist}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(WishlistBook);
