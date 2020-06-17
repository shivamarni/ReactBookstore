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
  }

  getapprovedbooks = async () => {
    await BooksController.getallbooks(this.state.pageNumber - 1).then((res) => {
      console.log(res);
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

    let displaySorts = this.state.sortArray.map((item) => {
      if (item !== this.state.visibleSort) {
        return (
          <div
            onClick={() => {
              this.handleSortClick(item);
            }}
          >
            {item}
          </div>
        );
      }
    });
    return (
      <div className="page-container">
        <AdminHeader />
        {/* <Header numberOfCartBooks={this.state.numberOfCartBooks} /> */}

        {/* <Footer /> */}
        <div className="outerdiv-books">
          <div className="content-div">
            {/* <div className="count-sort-div">
              <div className="count-div">
                Books
                <div className="items-div">( {this.state.count}Items)</div>
              </div>
              <div className="sort-div">
                <div class="dropdown">
                  <button class="dropbtn">
                    <div className="visiblesort-div">
                      <div> Sort by {this.state.visibleSort}</div>
                      <div className="arrow-symbol-div">⌄</div>
                    </div>
                  </button>
                  <div class="dropdown-content">{displaySorts}</div>
                </div>
              </div>
            </div> */}

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
