import React, { Component } from "react";
import IntersectionObserver from "../IntersectionObserver";
import Placeholder from "./Placeholder";
import Observable from "../Observable";
class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: new Array(5).fill(0)
    };
  }
  onTimeToGetMore = entry => {
    this.setState(({ list }) => ({
      list: list.concat(new Array(5).fill(0))
    }));
  };
  render() {
    const { list } = this.state;
    return (
      <IntersectionObserver threshold={[0.4]}>
        <div className="wrapper">
          {list.map((val, index) => <Placeholder key={index} />)}
        </div>
        <Observable onEnter={this.onTimeToGetMore} />
      </IntersectionObserver>
    );
  }
}

export default InfiniteScroll;
