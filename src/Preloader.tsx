import React, { ReactElement } from 'react';

export interface PreloaderProps {
  images: string[];
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
}

export class Preloader extends React.Component<PreloaderProps, PreloaderState> {
  state: PreloaderState = {
    loading: true,
    done: false
  }

  componentDidMount() {
    this.preloadImages()
  }

  urls = () => {
    let urlResults: string[] = []

    React.Children.map(this.props.children,
      child => {
        const res = this.getImageUrls(child as ReactElement<any>)
        urlResults = [...urlResults, ...res]
      }
    )

    return urlResults
  }

  preloadImages() {
    const urls = [...this.props.images, ...this.urls()]
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

  getImageUrls(parent: ReactElement<any>) {
    const results: string[] = []
    const traverseTree = (object: any) => {
      if (object.type === 'img') {
        results.push(object.props.src)
      }
      if (object.props.children) {
        traverseTree(object.props.children)
      }
      return results
    }

    const res = traverseTree(parent)
    console.log({ res })
    return res
  }

  updateImageState() {
    this.setState({
      done: true,
      loading: false,
    });
  }
  render() {
    return (
      <>
        {this.state.loading && 'Loading ....'}
        {this.state.done && this.props.children}
      </>
    )
  }
}