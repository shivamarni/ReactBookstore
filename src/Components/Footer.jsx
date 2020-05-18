import React, { Component } from "react";
import { Card } from "@material-ui/core";
import "../CSS/books.scss";
export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Card id="footer-card">
          <div classname="footer-card-div">
            <div className="footer-text">
              Copyright © 2020,Bookstore Private Limited.All Rights Reserved
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Footer;
