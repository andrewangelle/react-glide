import React, { ReactChild } from 'react';
import './index.css';

export interface GlideProps {
  images?: string[],
  width: number,
  autoPlay?: boolean, // false
  autoPlaySpeed?: number, // 2000
  infinite?: boolean, // true
  dots?: boolean, //true
  onSlideChange: () => void;
}

export interface GlideState {
  currentIndex: number;
  imagesLoaded: boolean;
}

class Glide extends React.Component<GlideProps, GlideState> {
  autoPlay: any;

  state: GlideState = {
    currentIndex: 0,
    imagesLoaded: false
  }

  startTimer() {
    if (this.props.autoPlay) {
      this.autoPlay = setInterval(
        () => this.goToNextSlide(),
        this.props.autoPlaySpeed || 5000
      );
    }
  }

  goToSelectedDot(index: number) {
    this.setState({ currentIndex: index });
  }

  goToPrevSlide() {
    const { children } = this.props;
    const { currentIndex } = this.state;
    const nextIndex = currentIndex === 0 ?
      (children as ReactChild[]).length - 1 : currentIndex - 1;

    this.setState({ currentIndex: nextIndex })
  }

  goToNextSlide() {
    const { children } = this.props;
    const { currentIndex } = this.state;
    const nextIndex = currentIndex === (children as ReactChild[]).length - 1 ?
      0 : currentIndex + 1;

    this.setState({ currentIndex: nextIndex })
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUpdate(nextProps: GlideProps, nextGlideState: any) {
    const { currentIndex } = this.state
    const onSlideChange = this.props.onSlideChange;
    const willIndexChange = currentIndex !== nextGlideState.currentIndex;

    if (onSlideChange) {
      willIndexChange ? this.props.onSlideChange() : '';
    }
  }

  render() {
    const { currentIndex } = this.state;
    const { infinite, children, dots } = this.props;
    const glideWidth = {
      position: 'relative' as any,
      width: this.props.width
    }
    return (
      <div
        className="glide--container"
        style={glideWidth}
      >
        <div
          className="glide--item"
        >
          {/* <CSSTransition
            classNames='current'
            timeout={300}
            appear={true}
          > */}
          {React.Children.toArray(children)[currentIndex]}
          {/* </CSSTransition> */}
        </div>

        {(infinite || currentIndex !== 0) &&
          <button
            className="glide--prev-btn"
            onClick={() => {
              clearInterval(this.autoPlay);
              this.goToPrevSlide();
            }}
          >
            &#10094;
          </button>
        }

        {(infinite || currentIndex !== (children as ReactChild[]).length - 1) &&
          <button
            className="glide--next-btn"
            onClick={() => {
              clearInterval(this.autoPlay);
              this.goToNextSlide();
            }}
          >
            &#10095;
          </button>
        }

        {(dots) &&
          <ul
            className="glide--dots"
          >
            {React.Children.map(children, (child, index) =>
              <li
                key={index}
                className={(currentIndex === index ? "active-dot" : "inactive-dot")}
                onClick={() => {
                  this.goToSelectedDot(index);
                }}
              >
                &middot;
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}

export { Glide }
