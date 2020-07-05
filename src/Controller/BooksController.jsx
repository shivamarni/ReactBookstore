import axios from "axios";
//require("dotenv").config();
const token = localStorage.getItem("SellerToken");
var controller = {
  getallbooks(pageNo) {
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`
      "http://localhost:8085/pagination/booksbyid/",
      {
        headers: {
          pageNo: pageNo,
          "Content-type": "application/json ",
        },
      }
    );
  },

  verifyBook(bookId) {
    return axios.post(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`
      "http://localhost:8085/book/verify",
      null,
      {
        headers: {
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },

  getallsellerbooks(pageNo) {
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`
      "http://localhost:8085/pagination/sellerbooks",
      {
        headers: {
          pageNo: pageNo,
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },

  getallapprovedbooks() {
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`
      "http://localhost:8085/book/getallbooks/"
    );
  },

  getcountofbooks() {
    return axios.get("http://localhost:8085/book/getbookcount");
  },
  getcountofsellerbooks() {
    return axios.get("http://localhost:8085/book/getsellerbookcount", {
      headers: {
        token: token,
        "Content-type": "application/json ",
      },
    });
  },
  getbooksPriceDesc(pageNo) {
    return axios.get(
      `http://localhost:8085/pagination/booksbyprice/descending/`,
      {
        headers: {
          pageNo: pageNo,
          "Content-type": "application/json ",
        },
      }
    );
  },
  getbooksPriceAsc(pageNo) {
    return axios.get(
      `http://localhost:8085/pagination/booksbyprice/ascending/`,
      {
        headers: {
          pageNo: pageNo,
          "Content-type": "application/json ",
        },
      }
    );
  },
  updateBooks(bookDetails) {
    // console.log("controller register method ", registrationDetails);
    return (
      axios.post("http://localhost:8085/book/update", bookDetails),
      {
        headers: {
          bookId: bookDetails.bookId,
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },
  getbooksNewest(pageNo) {
    return axios.get(
      `http://localhost:8085/pagination/booksbyprice/ascending/`,
      {
        headers: {
          pageNo: pageNo,
          "Content-type": "application/json ",
        },
      }
    );
  },
};

export default controller;
