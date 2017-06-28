import React, { Component } from "react";
import { IntersectionObserver, Observable } from "../src";

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
      <IntersectionObserver threshold={[0.1]}>
        <div className="wrapper">
          {list.map((val, index) =>
            <Observable key={index}>
              {isVisible =>
                <div className={`card ${isVisible && "visible"}`}>
                  { isVisible && "visible" }
                </div>}
            </Observable>
          )}
        </div>
        <Observable onEnter={this.onTimeToGetMore} />
      </IntersectionObserver>
    );
  }
}

export default InfiniteScroll;
