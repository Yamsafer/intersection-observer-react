# React IntersectionObserver

A simple wrapper around [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) API to use it within react apps.


## Installation
### yarn
`yarn add intersection-observer-react`
### npm
`npm install intersection-observer-react`
## Basic Usage

See examples 
* [Scroll Spy](https://yamsafer.github.io/intersection-observer-react/#/ScrollSpy)
* [Infinite Scroll](https://yamsafer.github.io/intersection-observer-react/#/InfiniteScroll)

### Children as function
```js
  import { IntersectionObserver, Observable} from 'intersection-observer-react'
  
  render() {
    return (<IntersectionObserver>
      <Observable>
        { isVisible =>  isVisible && "I Am Visible"  } 
      </Observable>
    </IntersectionObserver>)
  }
```

### `OnEnter`, `OnLeave`
```js
  import React, { Component } from 'react';
  import { IntersectionObserver, Observable } from "intersection-observer-react";

  class YourComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isVisible: false
      }
    }
    onEnter = () => {
      this.setState({
        isVisible: true
      })
    }
    onLeave = () => {
      this.setState({
        isVisible: false
      })
    }
    render() {
      const { isVisible } = this.state;
      return (
        <IntersectionObserver>
          <Observable
           onEnter={this.onEnter}
           onLeave={this.onLeave}
          >
            { isVisible && "I am Visible" }
          </Observable>
        </IntersectionObserver>
      );
    }
  }
```
## IntersectionObserver

### Options
Same options as [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

```
var options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}
```

#### root
> The element that is used as the viewport for checking visiblity of the target. Defaults to the browser viewport if not specified or if null.

#### rootMargin  
> Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). If the root element is specified, the values can be percentages. This set of values serves to grow or shrink each side of theroot element's bounding box before computing intersections. Defaults to all zeros.

#### threshold
> Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.

## Observable
### Options
#### onceOnly

Will not be observed after the first onEnter is called.

```
<Observable onceOnly>
</Observable>
```





