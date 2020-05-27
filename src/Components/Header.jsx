import React, { Component } from "react";
import {
  Card,
  IconButton,
  Paper,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BookImage from "../Assets/book.svg";
import "../CSS/books.scss";
import Footer from "./Footer.jsx";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }
  handleAvatarClick = async (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = async () => {
    this.setState({ anchorEl: null });
  };
  cartImageClick = () => {
    let token = localStorage.getItem("UserToken");
    if (token) {
      console.log(this.props);
      window.location = "http://localhost:3000/cart";
      // this.props.history.push("/cart");
    } else {
      this.setState({ loginDialogOpen: true });
    }
  };

  render() {
    return (
      <div>
        {/* <Footer /> */}
        <div>
          <Card id="appbar-card">
            <div className="appbar-card-div">
              <div className="logo-div">
                <div>
                  <img
                    style={{
                      height: "0.69cm",
                      width: "0.75cm",
                      opacity: "0.8",
                    }}
                    src={BookImage}
                  />
                </div>
                <div className="appbar-name">Bookstore</div>
              </div>
              <div className="search-div">
                <div>
                  <Paper elevation={3} id="appbar-search-paper">
                    <div className="appbar-paper-div">
                      <div className="search_icon">
                        <IconButton size="medium">
                          <SearchIcon id="search-icon-size" />
                        </IconButton>
                      </div>
                      <div>
                        <InputBase
                          id="inputbase-search"
                          inputProps={{ "aria-label": "description" }}
                          spellCheck={false}
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </Paper>
                </div>
              </div>
              <div className="cart-outer-div">
                <div className="cart-heading">Cart</div>
                <div className="cart-icon-div">
                  <ShoppingCartOutlinedIcon
                    id="cart-icon"
                    onClick={this.cartImageClick}
                  />
                </div>
                <div className="profile-avatar">
                  <Avatar
                    style={{ height: "39px" }}
                    src="/broken-image.jpg"
                    onClick={this.handleAvatarClick}
                  />

                  <div className="menu-div">
                    <Menu
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      open={Boolean(this.state.anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>
                        <div className="outer-div-profilemenu">
                          <div className="profilemenu-icons">
                            <AccountCircleIcon />
                          </div>
                          <div>Profile</div>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <div className="outer-div-profilemenu">
                          <div className="profilemenu-icons">
                            <FavoriteIcon />
                          </div>
                          <div>Wishlist</div>
                        </div>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <div className="outer-div-profilemenu">
                          <div className="profilemenu-icons">
                            <LibraryBooksIcon />
                          </div>
                          <div>Orders</div>
                        </div>
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Header;
