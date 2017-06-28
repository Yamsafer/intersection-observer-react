import "intersection-observer";
import React, { Component } from "react";
import { array, func } from "prop-types";

const childContextTypes = {
  subscribe: func,
  unsubscribe: func
};

const propTypes = {
  threshold: array
};

const defaultProps = {
  threshold: [0.1]
};

class Observer extends Component {
  constructor(props) {
    super(props);
    this.subscribers = [];
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.notifySubscribers = this.notifySubscribers.bind(this);
  }
  getChildContext() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe
    };
  }
  init() {
    const { root, rootMargin, threshold } = this.props;
    this.io = new IntersectionObserver(this.notifySubscribers, {
      root, rootMargin, threshold
    });
  }
  reset() {
    this.io.disconnect()
    this.init();
    this.subscribers.forEach(({ target }) => this.io.observe(target));
  }
  subscribe(target, onEnter, onLeave) {
    if(!this.io) this.init();
    this.subscribers = this.subscribers.concat({
      target, onEnter, onLeave
    });
    this.io.observe(target);
  }
  unsubscribe(target) {
    this.io.unobserve(target);
  }
  isLeaving(entry, observer) {
    return (
      entry.intersectionRatio >=
      observer.thresholds[observer.thresholds.length - 1]
    );
  }
  isComing(entry, observer) {
    return entry.intersectionRatio < observer.thresholds[0];
  }
  notifySubscribers(entries, observer) {
    entries.forEach(entry => {
      const instance = this.subscribers.find(
        ({ target }) => target === entry.target
      );
      this.isComing(entry, observer) &&
        instance.onEnter &&
        instance.onEnter(entry);
      this.isLeaving(entry, observer) &&
        instance.onLeave &&
        instance.onLeave(entry);
    });
  }
  componentDidUpdate(prevProps) {
    (prevProps.root !== this.props.root ||
      prevProps.threshold !== this.props.threshold ||
      prevProps.rootMargin !== this.props.rootMargin) &&
      this.reset();
  }
  render() {
    const { threshold, root, rootMargin, ...rest } = this.props;
    return <div {...rest} />;
  }
}

Observer.childContextTypes = childContextTypes;
Observer.defaultProps = defaultProps;
Observer.propTypes = propTypes;
export default Observer;
