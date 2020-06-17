import React, { Component } from "react";
import SellerHeader from "../Components/SellerHeader";
import Footer from "../Components/Footer";
import BooksController from "../Controller/BooksController";
import CartController from "../Controller/CartController";
import GetSellerBooks from "./GetSellerBooks";
import Dialog from "@material-ui/core/Dialog";

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
                  <button class="dropbtn">
                    <div className="visiblesort-div1">
                      <div> ADD BOOKS {this.state.visibleSort}</div>
                      {/* <div className="arrow-symbol-div">⌄</div> */}
                    </div>
                  </button>
                  {/* <div class="dropdown-content">{displaySorts}</div> */}
                </div>
              </div>
            </div>

            <div className="content-wrapper">{displayBooks}</div>
            <div className="div-outer-page-buttons">{displayPages}</div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default SellerBook;
