import React, { Component } from "react";
import {
  Paper,
  Button,
  Popover,
  Snackbar,
  Fade,
  Tooltip,
  Toolbar,
  MuiThemeProvider,
  IconButton,
  Typography,
  InputAdornment,
  Card,
  Dialog,
  Input,
} from "@material-ui/core";
import TextField from "../elements/CssTextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CartController from "../Controller/CartController";
import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";
import SellerController from "../Controller/SellerController.jsx";

class GetSellerBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paperElevation: 1,
      item: this.props.item,
      descOpen: false,
      snackMessage: "",
      open: false,
      addedToCart: false,
      openUpdateDialog: false,
      bookName: "",
      bookPrice: "",
      bookDescription: "",
      bookAuthor: "",
      noOfBooks: "",
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

  changeName = async (event) => {
    await this.setState({ bookName: event.target.value });
    console.log(this.state.bookName);
  };
  changePrice = async (event) => {
    await this.setState({ bookPrice: event.target.value });
    console.log(this.state.bookPrice);
  };
  changeDescription = async (event) => {
    await this.setState({ bookDescription: event.target.value });
    console.log(this.state.bookDescription);
  };
  changeAuthor = async (event) => {
    await this.setState({ bookAuthor: event.target.value });
    console.log(this.state.bookAuthor);
  };
  changeNoOfBooks = async (event) => {
    await this.setState({ noOfBooks: event.target.value });
    console.log(this.state.noOfBooks);
  };

  handleUpdateBook = () => {
    var bookDetails = {
      bookName: this.state.bookName,

      bookPrice: this.state.bookPrice,
      bookDescription: this.state.bookDescription,
      bookAuthor: this.state.bookAuthor,
      noOfBooks: this.state.noOfBooks,
      bookId: this.state.item.bookId,
    };

    SellerController.updateBooks(bookDetails).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res);

        // this.setState({
        //   error: true,
        //   message: "Registration success",
        // });
      }
    });
  };

  handleClose = () => {
    this.setState((currentState) => {
      return { open: !currentState.open };
    });
  };

  handleUpdateDialogClick = async () => {
    console.log("check here", this.state.openUpdateDialog);
    await this.setState({
      openUpdateDialog: !this.state.openUpdateDialog,
    });
    console.log("check here", this.state.openUpdateDialog);
  };

  render() {
    const {
      fields,
      errors,
      valid,
      showPassword,
      open,
      snackMessage,
    } = this.state;
    console.log(this.state.item);

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
            {/* <div className="div-quantity">
              books left {this.state.item.noOfBooks}
            </div> */}
            <div className="div-buttons">
              <Button
                id="div-bagbutton1"
                onClick={() => this.handleUpdateBook()}
              >
                UPDATE BOOK
              </Button>

              {/* <Button
                id="div-wishlistbutton"
                variant="outlined"
                onClick={this.handleWishlistClick}
              >
                Wishlist
              </Button> */}
            </div>
          </div>
        </Paper>
        <Popover open={this.state.descOpen}></Popover>
        <div className="dialog_note">
          <Dialog
            open={this.state.openUpdateDialog}
            onClose={this.handleDialogClickaway}
          >
            <div>
              <Card id="card_decordialog" variant="outlined">
                <div className="dialog_title">Updatebook</div>
                <div className="box_bookname">
                  <TextField
                    autoComplete="of"
                    style={{
                      marginBottom: "7px",
                      width: "91%",
                      marginLeft: "-4%",
                    }}
                    // style={{ width: "95%" }}
                    // style={{ marginLeft: "-5" }}
                    name="bookName"
                    id="bookName"
                    value={this.state.bookName}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeName}
                    label="BookName"
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <BookIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="box_bookauthor">
                  <TextField
                    autoComplete="of"
                    style={{
                      marginBottom: "7px",
                      width: "91%",
                      marginLeft: "-4%",
                    }}
                    name="bookAuthor"
                    id="bookAuthor"
                    value={this.state.bookAuthor}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeAuthor}
                    label="BookAuthor"
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="box_bookprice">
                  <TextField
                    autoComplete="of"
                    style={{ marginBottom: "7px" }}
                    name="bookPrice"
                    id="bookPrice"
                    value={this.state.bookPrice}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changePrice}
                    label="BookPrice"
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="box_noOfBooks">
                  <TextField
                    autoComplete="of"
                    style={{ marginBottom: "7px" }}
                    name="noOfBooks"
                    id="noOfBooks"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeNoOfBooks}
                    label="noOfBooks"
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PetsIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="box_description">
                  <TextField
                    autoComplete="of"
                    style={{
                      marginBottom: "7px",
                      width: "91%",
                      marginLeft: "-4%",
                    }}
                    name="bookDescription"
                    id="bookDescription"
                    value={this.state.bookDescription}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeDescription}
                    label="Book Description"
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EditIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="div-buttons2">
                  <Button
                    id="div-bagbutton2"
                    onClick={() => this.handleUpdateDialogClick()}
                  >
                    UPDATE
                  </Button>
                </div>
              </Card>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default GetSellerBooks;
