import React, { Component } from "react";
import UserController from "../Controller/UserController";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      message: "",
      token: this.props.match.params.token,
    };
  }

  componentDidMount() {
    this.verificationMethod();
  }

  verificationMethod = () => {
    UserController.verification(this.state.token).then((res) => {
      console.log("hiii...", res);
      if (res.status === 202) {
        alert("Email has been verified");
        this.props.history.push("/login");
        this.setState({
          error: true,
          message: "Email Verified",
        });
      }
      // else {
      //   this.setState({
      //     error: true,
      //     message: 'Please Reregister'
      //   })
      // }
    });
  };

  render() {
    return <div></div>;
  }
}

export default VerifyEmail;
