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
      openDialog: false,
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

  handleDialogClick = async () => {
    console.log("check here", this.state.openDialog);
    await this.setState({
      openDialog: true,
    });
    console.log("check here", this.state.openDialog);
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
                onClick={() => this.handleDialogClick()}
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
            open={this.state.openDialog}
            onClose={this.handleDialogClickaway}
          >
            <div>
              <Card id="card_decordialog" variant="outlined">
                <div className="dialog_title">Updatebook</div>
                <div className="box_bookname">
                  <TextField
                    autoComplete="of"
                    style={{ marginBottom: "7px" }}
                    name="name"
                    id="name"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeHandler}
                    label="BookName"
                    variant="outlined"
                    size="small"
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
                    style={{ marginBottom: "7px" }}
                    name="name"
                    id="name"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeHandler}
                    label="BookAuthor"
                    variant="outlined"
                    size="small"
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
                    name="name"
                    id="name"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeHandler}
                    label="price"
                    variant="outlined"
                    size="small"
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
                    name="name"
                    id="name"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeHandler}
                    label="noOfBooks"
                    variant="outlined"
                    size="small"
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
                    style={{ marginBottom: "7px" }}
                    name="name"
                    id="name"
                    // value={fields.name}
                    // error={valid.name}
                    // helperText={valid.name ? errors.name : "Name"}
                    onChange={this.changeHandler}
                    label="bookDescription"
                    variant="outlined"
                    size="small"
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
                    onClick={() => this.handleDialogClick()}
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
