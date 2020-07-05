import React, { Component } from "react";
import SellerHeader from "../Components/SellerHeader";
import Footer from "../Components/Footer";
import BooksController from "../Controller/BooksController";
import CartController from "../Controller/CartController";
import GetSellerBooks from "./GetSellerBooks";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {
  Paper,
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
  TextField,
  Input,
} from "@material-ui/core";

import BookIcon from "@material-ui/icons/Book";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PetsIcon from "@material-ui/icons/Pets";
import EditIcon from "@material-ui/icons/Edit";

class SellerBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellerArray: [],
      cartArray: [],
      count: 0,
      pages: 0,
      pageArray: [],
      pageNumber: 1,
      numberOfCartBooks: "",
      openAddDialog: false,
    };
  }

  componentDidMount() {
    this.getsellerbooks();
    this.getcount();
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
  onChangeImage = async (e) => {
    await this.setState({ file: e.target.files[0] });
    this.setState({ added: this.state.file.name });
  };

  handleButtonClick = async (item) => {
    await this.setState({
      bookArray: [],
      pageNumber: item,
    });
    console.log("page number", this.state.pageNumber);
    await BooksController.getallsellerbooks(this.state.pageNumber - 1).then(
      (res) => {
        this.setState({ sellerArray: res.data.data });
      }
    );
  };

  getsellerbooks = async () => {
    console.log("inside methioddddddddd");
    await BooksController.getallsellerbooks(this.state.pageNumber - 1).then(
      (res) => {
        console.log(res);

        console.log("hello", res.data.data);
        this.setState({ sellerArray: res.data.data });
      }
    );
  };

  getcount = async () => {
    let tempPageArr = [];
    await BooksController.getcountofsellerbooks().then((res) => {
      console.log("check here ", res.data.data);
      this.setState({
        count: res.data.data,
        pages: res.data.data / 8,
      });
      for (let i = 0; i < this.state.pages; i++) {
        tempPageArr.push(i + 1);
      }
      this.setState({
        pageArray: tempPageArr,
      });
    });
  };

  handleAddDialogClick = async () => {
    await this.setState({
      openAddDialog: !this.state.openAddDialog,
    });
  };

  render() {
    let displayBooks = this.state.sellerArray.map((item) => {
      return (
        <GetSellerBooks
          item={item}
          getCartArray={this.getCartArray}
          cartCount={this.cartCount}
          key={item.bookId}
        />
      );
    });
    let displayPages = this.state.pageArray.map((item) => {
      return (
        <div className="div-inner-page-buttons">
          <button
            className={
              this.state.pageNumber === item
                ? "page-active-buttons"
                : "page-buttons"
            }
            onClick={() => {
              this.handleButtonClick(item);
            }}
          >
            {item}
          </button>
        </div>
      );
    });

    return (
      <div className="page-container">
        <SellerHeader />

        <div className="outerdiv-books1">
          <div className="content-div">
            <div className="count-sort-div">
              <div className="count-div">
                Books
                <div className="items-div">( {this.state.count}Items)</div>
              </div>
              <div className="sort-div">
                <div class="dropdown">
                  <div>
                    {" "}
                    <Button
                      id="div-bagbutton6"
                      onClick={() => this.handleAddDialogClick()}
                    >
                      ADD Books
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-wrapper">{displayBooks}</div>
            <div className="div-outer-page-buttons">{displayPages}</div>
            <Footer />
          </div>
        </div>
        <Dialog
          open={this.state.openAddDialog}
          onClose={this.handleDialogClickaway}
        >
          <div>
            <Card id="card_decordialog" variant="outlined">
              <div className="dialog_title">Addbook</div>
              <div className="box_bookname">
                <TextField
                  autoComplete="of"
                  style={{
                    marginBottom: "7px",
                    width: "91%",
                    marginLeft: "-4%",
                  }}
                  name="bookName"
                  id="bookName"
                  value={this.state.bookName}
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
              <div className="box_noOfBooks1">
                <TextField
                  autoComplete="of"
                  style={{ marginBottom: "7px" }}
                  name="noOfBooks"
                  id="noOfBooks"
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
              <div className="choose-file">
                <div className="choose-file1">
                  <input
                    type="file"
                    onChange={this.onChangeImage}
                    style={{ marginLeft: "11%", marginTop: "5%" }}
                  />
                </div>
              </div>
              <div className="div-buttons2">
                <Button
                  id="div-bagbutton2"
                  onClick={() => this.handleAddDialogClick()}
                >
                  ADD NEW BOOK
                </Button>
              </div>
              <div className="div-buttons2">
                <Button
                  id="div-bagbutton10"
                  onClick={() => this.handleAddDialogClick()}
                >
                  CLOSE
                </Button>
              </div>
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SellerBook;
