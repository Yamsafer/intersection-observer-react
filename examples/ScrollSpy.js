import "intersection-observer";
import React, { Component } from "react";
import { StickyContainer, Sticky } from 'react-sticky';
import { IntersectionObserver, Observable } from "../src";


const genCharArray = (charA, charZ) => {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
    }
    return a;
}

class ScrollSpy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: genCharArray('a', 'z')
    };
  }
  onEnter = (char) => {
    console.log('onEnter called')
    char !== this.state.activeChar && this.setState({
      activeChar: char,
    })
  }
  render() {
    const { list, activeChar } = this.state;
    console.log('render called');
    return (
      <StickyContainer>
        <Sticky>
           { ({style, isSticky}) => (<span className='sticky-header' style={{
            ...style,
            display: isSticky ? 'block' : 'none'
          }}>
              {activeChar}
            </span>) 
          } 
        </Sticky>
        <IntersectionObserver threshold={[1]}>
          <div className="wrapper-1">
            {list.map((val, index) =>
             <Observable key={index} onEnter={ entry => this.onEnter(val)}>
                <div className="card">
                  { val }
                </div>
              </Observable>
            )}
          </div>
        </IntersectionObserver>
      </StickyContainer>
    );
  }
}

export default ScrollSpy;
