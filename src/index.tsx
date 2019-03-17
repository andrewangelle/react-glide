import React, { ReactChild } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Preloader } from './Preloader';
import './index.css';

export interface GlideProps {
  images?: string[];
  width: number;
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  infinite?: boolean;
  dots?: boolean;
  onSlideChange?: () => void;
}

export interface GlideState {
  loading: true;
  currentIndex: number;
  imagesLoaded: boolean;
}


class Glide extends React.Component<GlideProps, GlideState> {
  autoPlay: any;

  state: GlideState = {
    loading: true,
    currentIndex: 0,
    imagesLoaded: false
  }

  componentDidMount() {
    if (this.props.autoPlay) {
      this.startTimer();
    }
  }

  componentWillUnMount() {
    clearInterval(this.props.autoPlaySpeed)
  }

  componentDidUpdate(_prevProps: GlideProps, prevState: GlideState) {
    const { currentIndex: prevIndex } = prevState;
    const { currentIndex } = this.state;
    const { onSlideChange = () => null } = this.props;

    if (currentIndex !== prevIndex) {
      onSlideChange();
    }
  }

  startTimer() {
    if (this.props.autoPlay) {
      const { autoPlaySpeed = 5000 } = this.props
      this.autoPlay = setInterval(
        () => this.goToNextSlide(),
        autoPlaySpeed
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

  render() {
    const { currentIndex } = this.state;

    const {
      infinite = false,
      children,
      dots = true
    } = this.props;

    const glideWidth = {
      position: 'relative' as any,
      width: this.props.width
    }

    return (
      <div
        className="glide--container"
        style={glideWidth}
      >
        <div className="glide--item">
          <CSSTransition
            classNames='current'
            timeout={300}
            appear={true}
          >
            <Preloader
              elements={this.props.children}
              currentIndex={currentIndex}
            />
          </CSSTransition>
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

        {dots &&
          <ul className="glide--dots" >
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
