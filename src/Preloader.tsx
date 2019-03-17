import React, { Component, ReactElement } from 'react';

export interface PreloaderProps {
  elements: any;
  currentIndex: number;
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
}

export class Preloader extends Component<PreloaderProps, PreloaderState> {
  state: PreloaderState = {
    loading: true,
    done: false
  }

  componentDidMount() {
    this.preloadImages()
  }

  preloadImages() {
    const urls = this.getImageUrls()
    let newImage
    let loadCount = 0

    const handleImageLoad = () => {
      loadCount = loadCount + 1

      if (loadCount === urls.length) {
        this.updateImageState();
      }
    }

    if (urls.length > 0) {
      urls.forEach(child => {
        console.log(child)
        newImage = new Image();
        newImage.onload = handleImageLoad;
        newImage.src = child;
      });
    }

    if (urls.length == 0) {
      this.updateImageState();
    }
  }

  traverseTree = (element: ReactElement<any>) => {
    const results: string[] = []
    if (element.type === 'img') {
      results.push(element.props.src)
    }
    if (element.props.children) {
      return this.traverseTree(element.props.children)
    }
    return results
  }

  getImageUrls() {
    let urlResults: string[] = []

    this.props.elements.map((child: ReactElement<any>) => {
      const res = this.traverseTree(child)
      urlResults = [...urlResults, ...res]
    })
    console.log(urlResults)
    return urlResults
  }

  updateImageState() {
    this.setState({
      done: true,
      loading: false,
    });
  }

  render() {
    const { elements, currentIndex } = this.props
    return (
      <>
        {this.state.loading && 'Loading ....'}
        {this.state.done && elements[currentIndex]}
      </>
    )
  }
}
