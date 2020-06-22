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

  // cartCount = async () => {
  //   await CartController.getCartBooksCount()
  //     .then((response) => {
  //       this.setState({
  //         numberOfCartBooks: response.data.data,
  //       });
  //       console.log("numberOfCartBooks", this.state.numberOfCartBooks);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // getCartArray = async () => {
  //   await CartController.getCartBooks()
  //     .then((response) => {
  //       console.log(response.data.data);
  //       console.log(this.state.cartArray);
  //       this.setState({
  //         cartArray: response.data.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // getapprovedbooks = async () => {
  //   await BooksController.getallbooks(this.state.pageNumber - 1).then((res) => {
  //     console.log(res);
  //     this.setState({ sellerArray: res.data.data });
  //   });
  // };

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

  getsellerbooks = async () => {
    console.log("inside methioddddddddd");
    await BooksController.getallsellerbooks().then((res) => {
      console.log(res);

      console.log("hello", res.data.data);
      this.setState({ sellerArray: res.data.data });
    });
  };

  getcount = async () => {
    let tempPageArr = [];
    await BooksController.getcountofbooks().then((res) => {
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

  //   getwishlistarray = async () => {
  //     await CartController.getallwishlist().then((res) => {
  //       if (res.status === 200) {
  //         this.setState({
  //           wishlistArray: res.data.data,
  //         });
  //       }
  //     });
  //   };

  //   handleButtonClick = async (item) => {
  //     await this.setState({
  //       bookArray: [],
  //       pageNumber: item,
  //     });
  //     let sortState = this.state.visibleSort;
  //     if (sortState === "Relevance") {
  //       await BooksController.getallbooks(this.state.pageNumber - 1).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else if (sortState === "Newest Arrivals") {
  //       await BooksController.getbooksNewest(this.state.pageNumber).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else if (sortState === "Price: High to Low") {
  //       await BooksController.getbooksPriceDesc(this.state.pageNumber).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else {
  //       await BooksController.getbooksPriceAsc(this.state.pageNumber).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     }
  //   };

  //   handleSortClick = async (item) => {
  //     await this.setState({ visibleSort: item, bookArray: [] });
  //     let sortState = this.state.visibleSort;
  //     if (sortState === "Relevance") {
  //       await BooksController.getallbooks(this.state.pageNumber - 1).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else if (sortState === "Newest Arrivals") {
  //       await BooksController.getbooksNewest(this.state.pageNumber - 1).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else if (sortState === "Price: High to Low") {
  //       await BooksController.getbooksPriceDesc(this.state.pageNumber - 1).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     } else {
  //       await BooksController.getbooksPriceAsc(this.state.pageNumber - 1).then(
  //         (res) => {
  //           this.setState({ bookArray: res.data.data });
  //         }
  //       );
  //     }
  //   };

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

    // let displaySorts = this.state.sortArray.map((item) => {
    //   if (item !== this.state.visibleSort) {
    //     return (
    //       <div
    //         onClick={() => {
    //           this.handleSortClick(item);
    //         }}
    //       >
    //         {item}
    //       </div>
    //     );
    //   }
    // });
    return (
      <div className="page-container">
        <SellerHeader />
        {/* <Header numberOfCartBooks={this.state.numberOfCartBooks} /> */}

        {/* <Footer /> */}
        <div className="outerdiv-books">
          <div className="content-div">
            <div className="count-sort-div">
              <div className="count-div">
                Books
                <div className="items-div">( {this.state.count}Items)</div>
              </div>
              <div className="sort-div">
                <div class="dropdown">
                  {/* <button class="dropbtn"> */}
                  {/* <div className="visiblesort-div1"> */}
                  <div>
                    {" "}
                    <Button
                      id="div-bagbutton6"
                      onClick={() => this.handleAddDialogClick()}
                    >
                      ADD Books
                    </Button>
                  </div>
                  {/* <div className="arrow-symbol-div">⌄</div> */}
                  {/* </div> */}
                  {/* </button> */}
                  {/* <div class="dropdown-content">{displaySorts}</div> */}
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
              <div className="box_noOfBooks1">
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
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SellerBook;
