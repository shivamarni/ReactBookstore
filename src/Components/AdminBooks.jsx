import React, { Component } from "react";
import AdminHeader from "../Components/AdminHeader";
import Footer from "../Components/Footer";
import BooksController from "../Controller/BooksController";
import CartController from "../Controller/CartController";
import GetAdminBooks from "./GetAdminBooks";

class AdminBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookArray: [],
      cartArray: [],
      count: 0,
      pages: 0,
      pageArray: [],
      pageNumber: 1,
      numberOfCartBooks: "",
      sortArray: [
        "Price: Low to High",
        "Price: High to Low",
        "Newest Arrivals",
        "Relevance",
      ],
      visibleSort: "Relevance",
    };
  }

  componentDidMount() {
    this.getapprovedbooks();
    this.getcount();
    this.getCartArray();
    this.getwishlistarray();
    this.cartCount();
  }

  cartCount = async () => {
    await CartController.getCartBooksCount()
      .then((response) => {
        this.setState({
          numberOfCartBooks: response.data.data,
        });
        console.log("numberOfCartBooks", this.state.numberOfCartBooks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCartArray = async () => {
    await CartController.getCartBooks()
      .then((response) => {
        console.log(response.data.data);
        console.log(this.state.cartArray);
        this.setState({
          cartArray: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getapprovedbooks = async () => {
    await BooksController.getallbooks(this.state.pageNumber - 1).then((res) => {
      console.log(res);
      this.setState({ bookArray: res.data.data });
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

  getwishlistarray = async () => {
    await CartController.getallwishlist().then((res) => {
      if (res.status === 200) {
        this.setState({
          wishlistArray: res.data.data,
        });
      }
    });
  };

  handleButtonClick = async (item) => {
    await this.setState({
      bookArray: [],
      pageNumber: item,
    });

    await BooksController.getallbooks(this.state.pageNumber - 1).then((res) => {
      this.setState({ bookArray: res.data.data });
    });
  };

  render() {
    let displayBooks = this.state.bookArray.map((item) => {
      return (
        <GetAdminBooks
          item={item}
          getCartArray={this.getCartArray}
          cartCount={this.cartCount}
          key={item.bookId}
          getwishlistarray={this.getwishlistarray}
          inWishlist={false}
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
        <AdminHeader />

        <div className="outerdiv-books2">
          <div className="content-div">
            <div className="content-wrapper1">{displayBooks}</div>
            <div className="div-outer-page-buttons">{displayPages}</div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminBooks;
