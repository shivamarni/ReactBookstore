import axios from "axios";
//require("dotenv").config();
const token = localStorage.getItem("UserToken");
var CartController = {
  getCartBooks() {
    console.log(token);
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/cart/allcartbooks",
      {
        headers: {
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },

  getCartBooksCount() {
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/cart/allcartcount",
      {
        headers: {
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },

  addToBag(bookId) {
    return axios.post(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/cart/addbooktocart/",
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },

  wishlistToCart(bookId) {
    return axios.post(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/wishlist/wishlisttocart/",
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },
  removeFromWishlist(bookId) {
    return axios.post(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/wishlist/delete/",
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },

  addToWishlist(bookId) {
    return axios.post(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/wishlist/addbooktowishlist/",
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },

  getallwishlist() {
    console.log(token);
    return axios.get(
      //   process.env.REACT_APP_BASE_URL + `/book/displaybooks/${page}`

      "http://localhost:8085/wishlist/allwishlistbooks",

      {
        headers: {
          token: token,
          "Content-type": "application/json ",
        },
      }
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
  addQuantity(bookId) {
    return axios.post(
      `http://localhost:8085/quantity/incrementquantitytobook/`,
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },
  decreaseQuantity(bookId) {
    return axios.post(
      `http://localhost:8085/quantity/decrementquantitytobook/`,
      null,
      {
        headers: {
          token: token,
          bookId: bookId,
          "Content-type": "application/json ",
        },
      }
    );
  },
  removeCartItem(bookId) {
    return axios.post(`http://localhost:8085/cart/cartbook/delete`, null, {
      headers: {
        token: token,
        bookId: bookId,
        "Content-type": "application/json ",
      },
    });
  },
  removeCartItem(bookId) {
    return axios.post(`http://localhost:8085/cart/cartbook/delete`, null, {
      headers: {
        token: token,
        bookId: bookId,
        "Content-type": "application/json ",
      },
    });
  },
};

export default CartController;
