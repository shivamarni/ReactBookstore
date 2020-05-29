import axios from "axios";
//require("dotenv").config();

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

  getallapprovedbooks() {
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`
      "http://localhost:8085/book/getallbooks/"
    );
  },

  getcountofbooks() {
    return axios.get("http://localhost:8085/book/getbookcount");
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
