import React, { Component } from 'react';
import Observable from '../Observable';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
  }
  onEnter() {
    this.setState({
      isVisible: true
    });
  }
  onLeave(entry) {
    this.setState({
      isVisible: false
    });
  }
  render() {
    const { isVisible } = this.state;
    return (
      <Observable
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        className={`card ${isVisible ? " visible " : ""}`}
      >
          { isVisible && "🙂" }
      </Observable>
    );
  }
}
