import React, { Component, ReactElement } from 'react';

import { LoadingSpinner } from './LoadingSpinner';
import { PreloaderProps, PreloaderState } from './types';


class Preloader extends Component<PreloaderProps, PreloaderState> {
  urls: string[] = [];

  state: PreloaderState = {
    loading: true,
    done: false,
    loadCount: 0,
  }

  componentDidMount() {
    this.preloadImages()
  }

  componentDidUpdate(prevProps: PreloaderProps, prevState: PreloaderState) {
    const loadCountUpdated = prevState.loadCount !== this.state.loadCount;
    const allLoaded = this.state.loadCount === this.urls.length;
    const done = this.state.done !== prevState.done && this.state.done

    if (loadCountUpdated && allLoaded) {
      this.updateLoadState();
    }

    if (done && this.props.autoPlay) {
      this.props.startTimer()
    }

  }

  preloadImages = () => {
    const urls = this.getImageUrls()

    if (urls.length > 0) {
      urls.map(src => {
        const newImage = new Image();
        newImage.src = src;
        newImage.onload = this.updateLoadCount
      });
    }

    if (urls.length === 0) {
      this.updateLoadState()
    }
  }

  getImageUrls = () => {
    let urlResults: string[] = []
    const { children } = this.props;

    React.Children.map(children, (child: ReactElement, index) => {
      const res = this.traverseElementTree(child)
      urlResults = [...urlResults, ...res];
    })

    this.urls = [...urlResults]
    return urlResults
  }

  traverseElementTree = (element: ReactElement): string[] => {
    const results: string[] = [];
    if (element.type === 'img') {
      results.push(element.props.src)
    }
    if (element.props && element.props.children) {
      return this.traverseElementTree(element.props.children)
    }
    return results
  }

  updateLoadCount = () =>
    this.setState(prevState => ({ loadCount: prevState.loadCount + 1 }));
  ;

  updateLoadState = () =>
    this.setState(prevState => ({ done: true, loading: false }));
  ;

  render() {
    const { children, currentIndex } = this.props
    const { loading, done } = this.state;
    return (
      <>
        {loading && <LoadingSpinner width={this.props.width} />}
        {done &&
          React.Children.map(children, (child: ReactElement, index) => {
            const className = currentIndex === index ? 'current' : ''
            return child && (
              <child.type className={`glide--item ${className}`} {...child.props} />

            )
          })
        }
      </>
    )
  }
}

export { Preloader }