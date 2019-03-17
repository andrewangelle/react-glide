import React, { Component, ReactElement } from 'react';
import { GlideProps } from 'src/';
import './index.css'

export interface PreloaderProps extends GlideProps {
  currentIndex: number;
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
}

function LoadingSpinner({ width }: { width: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${(width / 66) * 50}px`
      }}
    >
      <div className='loading-indicator' />
    </div>
  )
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
        newImage = new Image();
        newImage.onload = handleImageLoad;
        newImage.src = child;
      });
    }

    if (urls.length == 0) {
      this.updateImageState();
    }
  }

  traverseElementTree(element: ReactElement<any>) {
    const results: string[] = []
    if (element.type === 'img') {
      results.push(element.props.src)
    }
    if (element.props.children) {
      return this.traverseElementTree(element.props.children)
    }
    return results
  }

  getImageUrls() {
    let urlResults: string[] = []
    const { children } = this.props;

    React.Children.map(children, (child: ReactElement<any>) => {
      const res = this.traverseElementTree(child)
      urlResults = [...urlResults, ...res]
    })

    return urlResults
  }

  updateImageState() {
    this.setState({ done: true, loading: false });
  }

  render() {
    const { children, currentIndex } = this.props
    const { loading, done } = this.state;
    return (
      <>
        {loading && <LoadingSpinner width={this.props.width} />}
        {done &&
          React.Children.toArray(children)[currentIndex]
        }
      </>
    )
  }
}
