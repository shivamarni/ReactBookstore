import React, { Component } from "react";
import classes from "../CSS/ResetPassword.module.scss";
import {
  Card,
  InputAdornment,
  IconButton,
  Button,
  RadioGroup,
  FormControlLabel,
  Backdrop,
} from "@material-ui/core";
import TextField from "../elements/CssTextField";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import StyledRadio from "../elements/StyledRadio";
import UserController from "../Controller/UserController";
//import Loader from "../UI/Loader";
//import UserService from "../Controller/UserService";
//import SellerService from "../Controller/SellerService";
//import AdminService from "../Controller/AdminService";

class ResetPassword extends Component {
  state = {
    showPassword: false,
    password: "",
    confirmPassword: "",
    passwordValid: false,
    error: "",
    valid: false,
    type: "User",
    loader: false,
  };

  submitHandler = () => {
    var data = {
      confirmPassword: this.state.password,
    };
    this.setState({ loader: true });
    if (this.state.type === "User") {
      UserController.userResetPassword(data, this.props.match.params.token)
        .then((response) => {
          this.setState({ loader: false });
          this.props.history.push("/login");
        })
        .catch((error) => {
          this.setState({ loader: false });
          console.log(error);
        });
    } else if (this.state.type === "Seller") {
      //   SellerService.sellerResetPassword(data, this.props.match.params.token)
      //     .then((response) => {
      //       this.setState({ loader: false });
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       this.setState({ loader: false });
      //       console.log(error);
      //     });
    } else if (this.state.type === "Admin") {
      //   AdminService.adminResetPassword(data, this.props.match.params.token)
      //     .then((response) => {
      //       this.setState({ loader: false });
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       this.setState({ loader: false });
      //       console.log(error);
      //     });
    }
  };

  componentDidMount() {
    console.log(this.props.match.params.token);
  }

  handleClickShowPassword = () => {
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  handleRadioChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  changeHandler = (event) => {
    let password = event.target.value;
    let isValid = this.isValidForm(password);
    this.setState({
      password: password,
      valid: isValid,
    });
  };

  isValidForm = (password) => {
    let formIsValid = true;
    let error = this.state.error;
    let passwordValid = this.state.passwordValid;

    if (!password) {
      formIsValid = false;
    }

    if (typeof password !== "undefined") {
      if (
        !password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        passwordValid = true;
        error = "*Please enter secure and strong password.";
      } else {
        passwordValid = false;
      }
    }

    this.setState({
      error: error,
      passwordValid: passwordValid,
    });
    return formIsValid;
  };

  render() {
    const { showPassword, password, error, passwordValid, valid } = this.state;

    return (
      <div className={classes.ResetpasswordContainer}>
        <Card className={classes.ResetpasswordCard} variant="outlined">
          <div className={classes.BookstoreName}>Bookstore</div>
          <div className={classes.Reset}>Reset Password</div>
          <div className={classes.Form}>
            <TextField
              style={{ marginBottom: "7px", marginLeft: "43px" }}
              size="small"
              variant="outlined"
              className="margin"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              error={passwordValid}
              // helperText={passwordValid ? error : "Password"}
              onChange={this.changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="black"
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <Visibility
                          style={{ color: "black" }}
                          fontSize="small"
                        />
                      ) : (
                        <VisibilityOff
                          style={{ color: "black" }}
                          fontSize="small"
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.Buttons}>
              <Button
                disabled={!valid}
                className={classes.Submit}
                onClick={this.submitHandler}
                variant="contained"
              >
                Submit
              </Button>
            </div>
            <RadioGroup
              style={{
                display: "flex",
                width: "80%",
                marginBottom: "20px",
                marginLeft: "12%",
                justifyContent: "space-between",
              }}
              row
              aria-label="position"
              name="position"
              value={this.state.type}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                value="User"
                control={<StyledRadio />}
                label={
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#333232",
                    }}
                  >
                    User
                  </div>
                }
              />
              <FormControlLabel
                value="Seller"
                control={<StyledRadio />}
                label={
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#333232",
                    }}
                  >
                    Seller
                  </div>
                }
              />
              {/* <FormControlLabel
                value="Admin"
                control={<StyledRadio />}
                label={
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#333232",
                    }}
                  >
                    Admin
                  </div>
                }
              /> */}
            </RadioGroup>
          </div>
          <Backdrop className={classes.ZIndex} open={this.state.loader}>
            {/* <Loader /> */}
          </Backdrop>
        </Card>
      </div>
    );
  }
}

export default ResetPassword;
