import React, { Component } from "react";
import Observable from "../Observable";

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }
  onEnter = () => {
    this.setState({ isVisible: true });
  };
  onLeave = entry => {
    this.setState({ isVisible: false });
  };
  render() {
    return (
      <Observable>
        {isVisible =>
          <div className={`card ${isVisible ? " visible " : ""}`}>
            {isVisible && "🙂"}
          </div>}
      </Observable>
    );
  }
}
