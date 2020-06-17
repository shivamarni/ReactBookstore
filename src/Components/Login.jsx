import React, { Component } from "react";
import classes from "../CSS/Login.module.scss";
import {
  Card,
  InputAdornment,
  IconButton,
  Link,
  Button,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  Snackbar,
} from "@material-ui/core";
import TextField from "../elements/CssTextField";
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import StyledRadio from "../elements/StyledRadio";
// import Loader from "../UI/Loader";
import UserController from "../Controller/UserController";
import AdminController from "../Controller/AdminController";
import SellerController from "../Controller/SellerController";

class Login extends Component {
  state = {
    fields: {},
    errors: {},
    valid: {
      emailAddress: false,
      password: false,
    },
    showPassword: false,
    isValid: false,
    type: "User",
    loader: false,
    open: false,
    snackMessage: "",
  };

  changeHandler = (e) => {
    let fields = { ...this.state.fields };
    fields[e.target.name] = e.target.value;
    let isValid = this.isValidForm(fields);
    this.setState({
      fields: fields,
      isValid: isValid,
    });
  };

  handleClickShowPassword = () => {
    this.setState((prevState) => {
      return { showPassword: !prevState.showPassword };
    });
  };

  handleClose = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  handleRadioChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  signInHandler = () => {
    var data = {
      email: this.state.fields.emailAddress,
      password: this.state.fields.password,
    };
    this.setState({ loader: true });
    if (this.state.type === "User") {
      UserController.userLogin(data)
        .then((response) => {
          this.setState({
            open: true,
            snackMessage: " Login Successfull",
          });
          console.log(response.data.data);
          localStorage.setItem("UserToken", response.data.data);
          this.props.history.push("/books");
        })
        .catch((error) => {
          this.setState({ loader: false });
          console.log(error);
        });
    } else if (this.state.type === "Admin") {
      AdminController.adminLogin(data)
        .then((response) => {
          this.setState({
            open: true,
            snackMessage: "Successfully loged-in",
            loader: false,
          });
          console.log(response.data.object);
          localStorage.setItem(
            "UserToken",
            JSON.stringify(response.data.object)
          );
        })
        .catch((error) => {
          this.setState({ loader: false });
          console.log(error);
        });
    } else if (this.state.type === "Seller") {
      SellerController.sellerLogin(data)
        .then((response) => {
          this.setState({
            open: true,
            snackMessage: "Successfully loged-in",
            loader: false,
          });
          console.log(response.data.object);
          localStorage.setItem("SellerToken", response.data.data);
          this.props.history.push("/sellerBooks");
        })
        .catch((error) => {
          this.setState({ loader: false });
          console.log(error);
        });
    }
  };

  isValidForm = (fields) => {
    let valid = { ...this.state.valid };
    let errors = { ...this.state.errors };
    let formIsValid = true;

    if (!fields["emailAddress"]) {
      formIsValid = false;
      errors["emailAddress"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailAddress"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailAddress"])) {
        valid["emailAddress"] = true;
        formIsValid = false;
        errors["emailAddress"] = "*Please enter valid email-ID.";
      } else {
        valid["emailAddress"] = false;
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        valid["password"] = true;
        errors["password"] = "*Please enter secure and strong password.";
      } else {
        valid["password"] = false;
      }
    }

    this.setState({
      errors: errors,
      valid: valid,
    });
    return formIsValid;
  };

  render() {
    const {
      fields,
      errors,
      valid,
      showPassword,
      open,
      snackMessage,
    } = this.state;
    return (
      <div className={classes.LoginContainer}>
        <Card className={classes.LoginCard} variant="outlined">
          <div className={classes.BookstoreName}>Bookstore</div>
          <div className={classes.Signin}>Login</div>
          <div className={classes.Form}>
            <TextField
              autoComplete="of"
              style={{ marginBottom: "7px" }}
              name="emailAddress"
              id="emailAddress"
              value={fields.emailAddress}
              error={valid.emailAddress}
              // helperText={valid.emailAddress ? errors.emailAddress : "Email"}
              onChange={this.changeHandler}
              label="Email Address"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              style={{ marginBottom: "7px" }}
              size="small"
              variant="outlined"
              className="margin"
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={fields.password}
              error={valid.password}
              // helperText={valid.password ? errors.password : "Password"}
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
            <Link className={classes.Forget} href="/forgotpassword">
              Forgot password?
            </Link>
            <div className={classes.Buttons}>
              <Button className={classes.SignupButton} href="/register">
                Sign up
              </Button>
              <Button
                disabled={!this.state.isValid}
                className={classes.SigninButton}
                onClick={this.signInHandler}
                variant="contained"
              >
                Sign in
              </Button>
            </div>
            <RadioGroup
              style={{
                display: "flex",
                width: "80%",
                marginBottom: "20px",
                alignSelf: "center",
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
                //disabled
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
              <FormControlLabel
                //disabled
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
              />
            </RadioGroup>
          </div>
        </Card>
        <Backdrop className={classes.ZIndex} open={this.state.loader}>
          {/* <Loader /> */}
        </Backdrop>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={1500}
          key={new Date().getTime()}
          open={open}
          onClose={this.handleClose}
          message={snackMessage}
        />
      </div>
    );
  }
}

export default Login;
