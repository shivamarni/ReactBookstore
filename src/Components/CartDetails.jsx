import React, { Component, Fragment } from "react";
import classes from "../CSS/CartDetails.module.scss";
import {
  Card,
  IconButton,
  Button,
  FormControlLabel,
  RadioGroup,
  Snackbar,
  Backdrop,
  Divider,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import StyledRadio from "../elements/StyledRadio";
import CssTextField from "../elements/CssTextField";
import UserController from "../Controller/UserController";
//import OrderService from "../Controller/OrderService";
//import Loader from "../UI/Loader";
import FormControl from "../elements/CssFormControl";
import Header from "./Header";
import BooksController from "../Controller/BooksController";
import CartController from "../Controller/CartController";

class CartDetails extends Component {
  state = {
    placeOrder: false,
    continue: false,
    type: "Home",
    cartlist: [],
    address: {
      landmark: "",
      city: "",
      country: "",
      address: "",
      addressType: "",
      pinCode: "",
      name: "",
      phonenumber: "",
    },
    blank: false,
    open: false,
    snackMessage: "",
    isPresent: false,
    loader: false,
    wishlistArray: [],
  };

  componentDidMount() {
    this.getCartBooks();
    //this.getAddress();
    // this.getwishlistarray();
  }

  //   getwishlistarray = async () => {
  //     await CartController.getallwishlist().then((res) => {
  //       if (res.status === 200) {
  //         this.setState({
  //           wishlistArray: res.data.object,
  //         });
  //       }
  //     });
  //   };

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

  getAddress = async () => {
    await UserController.getAddressByType(this.state.type)
      .then((response) => {
        if (response.data.data !== null) {
          let address = this.setAddress(response.data.object);
          let blank = this.isBlank(address);
          this.setState({
            address: address,
            blank: blank,
            isPresent: true,
          });
        } else {
          let address = this.setAddressField();
          let blank = this.isBlank(address);
          this.setState({
            address: address,
            blank: blank,
            isPresent: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   setAddress = (responseAddress) => {
  //     let address = {
  //       landmark: responseAddress.landmark,
  //       city: responseAddress.city,
  //       country: "",
  //       address: responseAddress.address,
  //       addressType: responseAddress.addressType,
  //       pinCode: responseAddress.pinCode,
  //       name: responseAddress.name,
  //       phonenumber: responseAddress.phonenumber,
  //     };
  //     return address;
  //   };

  //   setAddressField = () => {
  //     let address = {
  //       landmark: "",
  //       city: "",
  //       country: "",
  //       address: "",
  //       addressType: this.state.type,
  //       pinCode: "",
  //       name: "",
  //       phonenumber: "",
  //     };
  //     return address;
  //   };

  changeHandler = (event) => {
    let address = { ...this.state.address };
    address[event.target.name] = event.target.value;
    let blank = this.isBlank(address);
    this.setState({
      address: address,
      blank: blank,
    });
  };

  isBlank = (address) => {
    let isBlank = true;
    if (!address["name"] || typeof address["name"] === "undefined") {
      isBlank = false;
    }
    if (
      !address["phonenumber"] ||
      typeof address["phonenumber"] === "undefined"
    ) {
      isBlank = false;
    }
    if (!address["pinCode"] || typeof address["pinCode"] === "undefined") {
      isBlank = false;
    }
    if (
      address["country"] === "" ||
      typeof address["country"] === "undefined"
    ) {
      isBlank = false;
    }
    if (!address["address"] || typeof address["address"] === "undefined") {
      isBlank = false;
    }
    if (!address["city"] || typeof address["city"] === "undefined") {
      isBlank = false;
    }
    if (!address["landmark"] || typeof address["landmark"] === "undefined") {
      isBlank = false;
    }
    return isBlank;
  };

  placeOrderHandler = () => {
    this.setState((prevState) => {
      return { placeOrder: !prevState.placeOrder };
    });
  };

  //   addNewAddress = () => {
  //     this.setState({ loader: true });
  //     UserService.addNewAddress(this.state.address)
  //       .then((response) => {
  //         console.log(response.data);
  //         this.setState({
  //           open: true,
  //           snackMessage: response.data.message,
  //           loader: false,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.setState({ loader: false });
  //       });
  //   };

  //   updateAddress = () => {
  //     this.setState({ loader: true });
  //     UserService.updateAddress(this.state.type, this.state.address)
  //       .then((response) => {
  //         console.log(response.data);
  //         this.setState({
  //           open: true,
  //           snackMessage: response.data.message,
  //           loader: false,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         this.setState({ loader: false });
  //       });
  //   };

  continueHandler = () => {
    // console.log(this.state.isPresent)
    // console.log(this.state.address)
    if (this.state.isPresent) {
      this.updateAddress();
    } else {
      this.addNewAddress();
    }

    this.setState((prevState) => {
      return { continue: !prevState.continue };
    });
  };

  editHandler = () => {
    this.setState((prevState) => {
      return { continue: !prevState.continue };
    });
  };

  //   orderPlaced = () => {
  //     this.setState({ loader: true });
  //     OrderService.checkout(
  //       this.state.type,
  //       this.deliveryCharge(),
  //       this.totalCartPrice()
  //     )
  //       .then((response) => {
  //         this.setState({
  //           open: true,
  //           snackMessage: response.data.message,
  //           loader: false,
  //         });
  //         console.log(response.data.object.orderTackingId);
  //         this.props.history.push(
  //           "/bookstore/oderplaced",
  //           response.data.object.orderTackingId
  //         );
  //       })
  //       .catch((error) => {
  //         this.setState({
  //           open: true,
  //           snackMessage: error.response.data.message,
  //           loader: false,
  //         });
  //         console.log(error);
  //       });
  //   };

  handleRadioChange = async (event) => {
    await this.setState({
      type: event.target.value,
    });
    this.getAddress();
  };

  addBookHandler = async (bookId) => {
    console.log(bookId);
    await CartController.addQuantity(bookId)

      .then((response) => {
        console.log(response.data);
        // this.setState({
        //   cartlist: response.data.data,
        // });
        this.getCartBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeBook = async (bookId) => {
    await CartController.removeCartItem(bookId)
      .then((response) => {
        console.log(response.data);
        // this.setState({
        //     open: true,
        //     snackMessage: response.data.message,
        //     cartlist: response.data.object,
        // });
        this.getCartBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  removeBookHandler = async (bookId) => {
    await CartController.decreaseQuantity(bookId)
      .then((response) => {
        console.log(response.data);
        // this.setState({
        //   cartlist: response.data.object,
        // });
        this.getCartBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  totalCartPrice = () => {
    let total = 0;
    this.state.cartlist.forEach((cart) => {
      total = total + cart.quantityOfBooks * cart.bookPrice;
    });
    return total;
  };

  deliveryCharge = () => {
    if (this.state.address.country === "India") {
      return 50;
    } else {
      return 200;
    }
  };

  handleClose = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  render() {
    const { cartlist, address, open, snackMessage, wishlistArray } = this.state;

    return (
      <Fragment>
        <Header
          cartCount={cartlist.length}
          wishlistCount={wishlistArray.length}
        />
        <div className={classes.CartDetails}>
          <Card className={classes.CartItem} variant="outlined">
            <div className={classes.No_of_cart_items}>
              My cart({cartlist.length})
            </div>
            {cartlist.map((cart) => (
              <div className={classes.Item} key={cart.cartId}>
                {console.log()}
                <img
                  className={classes.BookImage}
                  src={cart.bookImage}
                  alt="book"
                />
                <div className={classes.BookDetails}>
                  <div className={classes.BookName}>{cart.bookName}</div>
                  <div className={classes.AuthorName}>{cart.bookAuthor}</div>
                  <div className={classes.BookPrice}>
                    <strong>Rs. {cart.bookPrice}</strong>
                  </div>

                  <div
                    className={classes.BookQuantity}
                    style={
                      this.state.placeOrder ? { marginBottom: "16px" } : null
                    }
                  >
                    <IconButton
                      className={classes.Minus}
                      disabled={
                        cart.quantityOfBooks <= 1 || this.state.placeOrder
                      }
                      onClick={() => this.removeBookHandler(cart.bookId)}
                      size="small"
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <div className={classes.Quantity}>
                      {cart.quantity.cartQuantity}
                    </div>
                    <IconButton
                      className={classes.Pluse}
                      disabled={
                        this.state.placeOrder ||
                        cart.quantityOfBooks >= cart.noOfBooks
                      }
                      size="small"
                      onClick={() => this.addBookHandler(cart.bookId)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                    <Button
                      onClick={() => this.removeBook(cart.bookId)}
                      style={{
                        fontWeight: "500",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div
              className={classes.PlaceOrder}
              style={!this.state.placeOrder ? null : { display: "none" }}
            >
              <Button
                disabled={cartlist.length < 1}
                className={classes.PlaceOrderButton}
                onClick={this.placeOrderHandler}
                variant="contained"
                color="primary"
              >
                Place order
              </Button>
            </div>
          </Card>

          <Card className={classes.CustomerDetails} variant="outlined">
            <div className={classes.DetailsHeader}>
              <div className={classes.Text}>Customer Details</div>
              {this.state.continue ? (
                <div className={classes.Edit} onClick={this.editHandler}>
                  Edit
                </div>
              ) : null}
            </div>
            <div
              className={classes.Details}
              style={
                this.state.placeOrder
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              <div className={classes.Row_1}>
                <CssTextField
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                  autoComplete="off"
                  variant="outlined"
                  name="name"
                  onChange={this.changeHandler}
                  value={address.name}
                  label="Name"
                />
                <CssTextField
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                  name="phonenumber"
                  onChange={this.changeHandler}
                  value={address.phonenumber}
                  autoComplete="off"
                  variant="outlined"
                  label="Phone number"
                />
              </div>
              <div className={classes.Row_2}>
                <CssTextField
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                  name="pinCode"
                  onChange={this.changeHandler}
                  value={address.pinCode}
                  autoComplete="off"
                  variant="outlined"
                  label="Pincode"
                />

                <FormControl
                  variant="outlined"
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="country"
                    value={address.country ? address.country : ""}
                    onChange={this.changeHandler}
                    label="Country"
                  >
                    <MenuItem value={"India"}>India</MenuItem>
                    <MenuItem value={"USA"}>USA</MenuItem>
                    <MenuItem value={"Russia"}>Russia</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.Row_3}>
                <CssTextField
                  className={classes.Address}
                  disabled={this.state.continue}
                  required
                  autoComplete="off"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={address.address}
                  onChange={this.changeHandler}
                  name="address"
                  label="Address"
                />
              </div>
              <div className={classes.Row_4}>
                <CssTextField
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                  autoComplete="off"
                  variant="outlined"
                  name="city"
                  value={address.city}
                  onChange={this.changeHandler}
                  label="City/Town"
                />
                <CssTextField
                  className={classes.Textfield}
                  disabled={this.state.continue}
                  required
                  autoComplete="off"
                  variant="outlined"
                  name="landmark"
                  value={address.landmark}
                  onChange={this.changeHandler}
                  label="Landmark"
                />
              </div>
              <div className={classes.Type}>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#333232",
                    textAlign: "left",
                    marginTop: "16px",
                  }}
                >
                  Type
                </div>
                <RadioGroup
                  style={
                    this.state.continue
                      ? {
                          display: "flex",
                          width: "70%",
                          marginBottom: "30px",
                          justifyContent: "space-between",
                        }
                      : {
                          display: "flex",
                          width: "70%",
                          justifyContent: "space-between",
                        }
                  }
                  row
                  aria-label="position"
                  name="position"
                  value={this.state.type}
                  onChange={this.handleRadioChange}
                >
                  <FormControlLabel
                    disabled={this.state.continue}
                    value="Home"
                    control={<StyledRadio />}
                    label={
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#333232",
                        }}
                      >
                        Home
                      </div>
                    }
                  />
                  <FormControlLabel
                    disabled={this.state.continue}
                    value="Office"
                    control={<StyledRadio />}
                    label={
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#333232",
                        }}
                      >
                        Office
                      </div>
                    }
                  />
                  <FormControlLabel
                    disabled={this.state.continue}
                    value="Other"
                    control={<StyledRadio />}
                    label={
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#333232",
                        }}
                      >
                        Other
                      </div>
                    }
                  />
                </RadioGroup>
              </div>
              <div
                className={classes.Continue}
                style={!this.state.continue ? null : { display: "none" }}
              >
                <Button
                  disabled={!this.state.blank}
                  className={classes.ContinueButton}
                  onClick={this.continueHandler}
                  variant="contained"
                  color="primary"
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
          <Card className={classes.OrderSummery} variant="outlined">
            <div className={classes.Summery}>Order summery</div>
            <div
              className={classes.OrderDetails}
              style={
                this.state.continue ? { display: "flex" } : { display: "none" }
              }
            >
              {cartlist.map((cart) => (
                <div className={classes.OrderedItem} key={cart.cartId}>
                  <img
                    className={classes.OrderedBookImage}
                    src={cart.bookImage}
                    alt="book"
                  />
                  <div className={classes.OrderedBookDetails}>
                    <div className={classes.OrderedBookName}>
                      {cart.bookName}
                    </div>
                    <div className={classes.OrderedAuthorName}>
                      {cart.bookAuthor}
                    </div>
                    <div className={classes.OrderedBookPrice}>
                      <strong>Rs. {cart.bookPrice}</strong>
                    </div>
                    <div className={classes.ItemTotal}>
                      <div className={classes.Qty}>
                        <strong>Qty:</strong> {cart.quantityOfBooks}
                      </div>
                      <div className={classes.Total}>
                        <strong>Price:</strong>{" "}
                        {cart.quantityOfBooks * cart.bookPrice}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className={classes.DeliveryCharges}>
                <strong>Delivery Fee:</strong> {this.deliveryCharge()}
              </div>
              <Divider />
              <div className={classes.TotalCartValue}>
                <strong>Total Amount: </strong>
                {this.totalCartPrice() + this.deliveryCharge()}
              </div>
              <div className={classes.Checkout}>
                <Button
                  className={classes.CheckoutButton}
                  onClick={this.orderPlaced}
                  variant="contained"
                  color="primary"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </Card>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            autoHideDuration={2500}
            key={new Date().getTime()}
            open={open}
            onClose={this.handleClose}
            message={snackMessage}
          />
          <Backdrop className={classes.ZIndex} open={this.state.loader}>
            {/* <Loader /> */}
          </Backdrop>
        </div>
      </Fragment>
    );
  }
}

export default CartDetails;
