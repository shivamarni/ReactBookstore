import React, { Component } from "react";
import {
  Paper,
  Button,
  Popover,
  Snackbar,
  Dialog,
  Card,
} from "@material-ui/core";
import CartController from "../Controller/CartController";
import BookController from "../Controller/BooksController";

class GetAdminBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperElevation: 1,
      item: this.props.item,
      descOpen: false,
      snackMessage: "",
      open: false,
      addedToCart: false,
      approveState: false,
      disapproveState: false,
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

  handleApproveClick = async () => {
    await this.setState({
      approveState: !this.state.approveState,
    });
  };

  handleDisapproveClick = async () => {
    await this.setState({
      disapproveState: !this.state.disapproveState,
    });
  };

  handleApproveBookCancel = async () => {
    await this.setState({
      approveState: !this.state.approveState,
    });
  };

  handleDisApproveBookCancel = async () => {
    await this.setState({
      disapproveState: !this.state.disapproveState,
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

  handleApproveBook = async () => {
    BookController.verifyBook(this.state.item.bookId).then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({
          approveState: !this.state.approveState,
        });
      }
    });
  };

  handleDisApproveBook = async () => {
    BookController.verifyBook(this.state.item.bookId).then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({
          disapproveState: !this.state.disapproveState,
        });
      }
    });
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

        <Paper elevation={1} id="paper-book1">
          <Paper elevation={1} id="paper-book-below1">
            <div className="book-img-div">
              <img src={this.state.item.bookImage} className="book-image" />
            </div>
          </Paper>
          <div className="outer-details-div1">
            <div className="div-bookname1">{this.state.item.bookName}</div>
            <div className="div-author1"> {this.state.item.bookAuthor}</div>
            <div className="div-price1">Rs. {this.state.item.bookPrice}</div>
            <div className="div-seller">Seller:Shiva Marni</div>
            <div className="admin-description1">
              Description:{this.state.item.bookDescription}
            </div>
            <div className="div-buttons5">
              <Button
                id="div-bagbutton5"
                onClick={() => this.handleDisapproveClick()}
              >
                DISAPPROVE
              </Button>

              <Button
                id="div-approve"
                variant="outlined"
                onClick={this.handleApproveClick}
              >
                APPROVE
              </Button>
            </div>
          </div>
        </Paper>

        <Popover open={this.state.descOpen}></Popover>
        <Dialog
          open={this.state.approveState}
          onClose={this.handleDialogClickaway}
        >
          <div>
            <Card id="card_decordialog2" variant="outlined">
              <div className="dia-text"> Are You Sure to Approve Book?</div>
              <div className="but">
                <div className="div-can1">
                  <Button
                    id="div-cancel1"
                    onClick={() => this.handleApproveBookCancel()}
                  >
                    cancel
                  </Button>
                </div>
                <div className="div-ok">
                  <Button id="div-ok1" onClick={() => this.handleApproveBook()}>
                    ok
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Dialog>

        <Dialog
          open={this.state.disapproveState}
          onClose={this.handleDialogClickaway}
        >
          <div>
            <Card id="card_decordialog2" variant="outlined">
              <div className="dia-text"> Are You Sure to DisApprove Book?</div>
              <div className="div-can1">
                <Button
                  id="div-cancel1"
                  onClick={() => this.handleDisApproveBookCancel()}
                >
                  cancel
                </Button>
              </div>
              <div className="div-ok">
                <Button
                  id="div-ok1"
                  onClick={() => this.handleDisApproveBook()}
                >
                  ok
                </Button>
              </div>
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default GetAdminBooks;
