import React, { Component } from 'react';
import { func } from 'prop-types';

const contextTypes = {
  subscribe: func,
  unsubscribe: func
};

class Observable extends Component {
  constructor(props) {
    super(props);
    this.onRef = this.onRef.bind(this);
  }
  onRef(ref) {
    this.ref = ref;
  }
  componentDidMount() {
    if (!this.context.subscribe) {
      throw new TypeError('Expected Observable to be mounted within IntersectionObserver');
    }
    const { onLeave, onEnter } = this.props;
    this.context.subscribe(this.ref, onLeave, onEnter);
  }
  render() {
    const { onLeave, onEnter, ...rest } = this.props;
    return (<div ref={this.onRef} {...rest} />);
  }
}

Observable.contextTypes = contextTypes;
export default Observable;
