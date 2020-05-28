import axios from "axios";
//require("dotenv").config();
const token = localStorage.getItem("UserToken");
var OrderController = {
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
  getcountofbooks() {
    return axios.get("http://localhost:8085/book/getbookcount");
  },
  checkout(type, deliveryCharges, totalCartPrice) {
    return axios.post(`http://localhost:8085/order/addorderdetails/`, null, {
      headers: {
        token: token,
        type: type,
        deliveryCharges: deliveryCharges,
        totalCartPrice: totalCartPrice,
        "Content-type": "application/json ",
      },
    });
  },
};

export default OrderController;
