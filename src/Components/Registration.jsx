import React, { Component } from "react";
import {
  Card,
  InputAdornment,
  IconButton,
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
import AccountCircle from "@material-ui/icons/AccountCircle";
import ContactPhoneRoundedIcon from "@material-ui/icons/ContactPhoneRounded";
import classes from "../CSS/Registration.module.scss";
import StyledRadio from "../elements/StyledRadio";
//import Loader from "../UI/Loader";
import UserController from "../Controller/UserController";
import SellerController from "../Controller/SellerController";
import AdminController from "../Controller/AdminController";

class Registration extends Component {
  state = {
    fields: {},
    errors: {},
    valid: {
      name: false,
      email: false,
      mobile: false,
      password: false,
    },
    showPassword: false,
    isValid: false,
    type: "User",

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
    let showPassword = !this.state.showPassword;
    this.setState({ showPassword });
  };

  signUpHandler = () => {
    var data = {
      name: this.state.fields.name,
      email: this.state.fields.email,
      phoneNumber: this.state.fields.mobile,
      password: this.state.fields.password,
    };

    if (this.state.type === "User") {
      // console.log(data);
      UserController.userRegistration(data)
        .then((response) => {
          // alert("inside registration");
          console.log("registration successful");

          this.props.history.push("/login");
        })
        .catch((error) => {
          //   this.setState({ loader: false });
          console.log(error);
        });
    } else if (this.state.type === "Seller") {
      SellerController.sellerRegistration(data)
        .then((response) => {
          this.props.history.push("/login");
          this.setState({
            open: true,
            snackMessage: "Successfully Registered",
            // loader: false,
          });
        })
        .catch((error) => {
          this.setState({
            open: true,
            snackMessage: "Something went wrong",
            // loader: false,
          });
          console.log(error);
        });
    } else if (this.state.type === "Admin") {
      AdminController.adminRegistration(data)
        .then((response) => {
          this.setState({
            open: true,
            snackMessage: "Successfully loged-in",
            // loader: false,
          });
        })
        .catch((error) => {
          this.setState({
            open: true,
            snackMessage: "Something went wrong",
            // loader: false,
          });
          console.log(error);
        });
    }
  };

  handleRadioChange = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleClose = () => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    });
  };

  isValidForm = (fields) => {
    let valid = { ...this.state.valid };
    let errors = { ...this.state.errors };
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        valid["name"] = true;
        errors["name"] = "*Please enter alphabet characters only.";
      } else {
        valid["name"] = false;
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        valid["email"] = true;
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      } else {
        valid["email"] = false;
      }
    }

    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "*Please enter your mobile no.";
    }

    if (typeof fields["mobile"] !== "undefined") {
      if (!fields["mobile"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        valid["mobile"] = true;
        errors["mobile"] = "*Please enter valid mobile no.";
      } else {
        valid["mobile"] = false;
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
      <div className={classes.RegistrationContainer}>
        <Card className={classes.RegisterCard} variant="outlined">
          <div className={classes.BookstoreName}> Bookstore</div>
          <div className={classes.Signup}>Registration</div>
          <div className={classes.Form}>
            <TextField
              autoComplete="of"
              style={{ marginBottom: "7px" }}
              name="name"
              id="name"
              value={fields.name}
              error={valid.name}
              // helperText={valid.name ? errors.name : "Name"}
              onChange={this.changeHandler}
              label="Name"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoComplete="of"
              style={{ marginBottom: "7px" }}
              name="email"
              id="email"
              value={fields.email}
              error={valid.email}
              // helperText={valid.email ? errors.email : "Email"}
              onChange={this.changeHandler}
              label="Email Address"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoComplete="of"
              style={{ marginBottom: "7px" }}
              name="mobile"
              id="mobile"
              value={fields.mobile}
              error={valid.mobile}
              // helperText={valid.mobile ? errors.mobile : "Mobile No"}
              onChange={this.changeHandler}
              label="Phone Number"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContactPhoneRoundedIcon />
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
                        <Visibility style={{ color: "black" }} />
                      ) : (
                        <VisibilityOff style={{ color: "black" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.Buttons}>
              <Button className={classes.SigninButton} href="/login">
                Sign in
              </Button>
              <Button
                disabled={!this.state.isValid}
                className={classes.SignupButton}
                onClick={this.signUpHandler}
                variant="contained"
              >
                Sign up
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
                // disabled
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
                // disabled
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

export default Registration;
