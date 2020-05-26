import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import BooksController from "../Controller/BooksController";
import GetBook from "./GetBook";

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookArray: [],
      count: 0,
      pages: 0,
      pageArray: [],
      pageNumber: 1,
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
  }

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

  handleButtonClick = async (item) => {
    await this.setState({
      bookArray: [],
      pageNumber: item,
    });
    let sortState = this.state.visibleSort;
    if (sortState === "Relevance") {
      await BooksController.getallbooks(this.state.pageNumber - 1).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else if (sortState === "Newest Arrivals") {
      await BooksController.getbooksNewest(this.state.pageNumber).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else if (sortState === "Price: High to Low") {
      await BooksController.getbooksPriceDesc(this.state.pageNumber).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else {
      await BooksController.getbooksPriceAsc(this.state.pageNumber).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    }
  };

  handleSortClick = async (item) => {
    await this.setState({ visibleSort: item, bookArray: [] });
    let sortState = this.state.visibleSort;
    if (sortState === "Relevance") {
      await BooksController.getallbooks(this.state.pageNumber - 1).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else if (sortState === "Newest Arrivals") {
      await BooksController.getbooksNewest(this.state.pageNumber - 1).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else if (sortState === "Price: High to Low") {
      await BooksController.getbooksPriceDesc(this.state.pageNumber - 1).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    } else {
      await BooksController.getbooksPriceAsc(this.state.pageNumber - 1).then(
        (res) => {
          this.setState({ bookArray: res.data.data });
        }
      );
    }
  };

  render() {
    let displayBooks = this.state.bookArray.map((item) => {
      return <GetBook item={item} />;
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
        <Header />
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
                    <div className="visiblesort-div">
                      <div> Sort by {this.state.visibleSort}</div>
                      <div className="arrow-symbol-div">⌄</div>
                    </div>
                  </button>
                  <div class="dropdown-content">{displaySorts}</div>
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

export default Books;
