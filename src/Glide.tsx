import React, { ReactChild } from 'react';
import { Preloader } from './Preloader';
import './reactGlide.css';

export interface GlideProps {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  height?: number;
  infinite?: boolean;
  width: number;
  onSlideChange?: () => void;
}

export interface GlideState {
  loading: true;
  currentIndex: number;
  imagesLoaded: boolean;
}

class Glide extends React.Component<GlideProps, GlideState> {
  autoPlay: NodeJS.Timeout;

  state: GlideState = {
    loading: true,
    currentIndex: 0,
    imagesLoaded: false
  }

  componentWillUnMount() {
    clearInterval(this.props.autoPlaySpeed)
  }

  componentDidUpdate(_prevProps: GlideProps, prevState: GlideState) {
    const { currentIndex: prevIndex } = prevState;
    const { currentIndex } = this.state;
    const { onSlideChange } = this.props;

    if (currentIndex !== prevIndex && onSlideChange) {
      onSlideChange();
    }
  }

  startTimer = () => {
    if (this.props.autoPlay) {
      const { autoPlaySpeed = 5000 } = this.props
      this.autoPlay = setInterval(
        () => this.goToNextSlide(),
        autoPlaySpeed
      );
    }
  }

  goToSelectedDot = (index: number) => {
    this.setState({ currentIndex: index });
  }

  goToPrevSlide = () => {
    const { children } = this.props;
    const { currentIndex } = this.state;

    const lastSlide = React.Children.toArray(children).length - 1
    const nextIndex = currentIndex === 0 ? lastSlide : currentIndex - 1;

    this.setState({ currentIndex: nextIndex })
  }

  goToNextSlide = () => {
    const { children } = this.props;
    const { currentIndex } = this.state;

    const lastSlide = React.Children.toArray(children).length - 1
    const nextIndex = currentIndex === lastSlide ? 0 : currentIndex + 1;

    this.setState({ currentIndex: nextIndex })
  }

  render() {
    const { currentIndex } = this.state;

    const {
      infinite = false,
      children,
      dots = true
    } = this.props;

    const styleProps = {
      height: this.props.height,
      width: this.props.width,
    }

    return (
      <div className="glide--container" style={styleProps}>
        <Preloader
          startTimer={() => this.startTimer()}
          {...this.props}
          {...this.state}
        >
          {children}
        </Preloader>


        {(infinite || currentIndex !== 0) &&
          <button
            className="glide--prev-btn"
            onClick={() => {
              clearInterval(this.autoPlay)
              this.goToPrevSlide()
            }}
          >
            &#10094;
          </button>
        }

        {(infinite || currentIndex !== (children as ReactChild[]).length - 1) &&
          <button
            className="glide--next-btn"
            onClick={() => {
              clearInterval(this.autoPlay)
              this.goToNextSlide();
            }}
          >
            &#10095;
          </button>
        }

        {dots &&
          <section className="glide--dots" >
            {React.Children.map(children, (child, index) =>
              <span
                key={index}
                className={(currentIndex === index ? 'active-dot' : 'inactive-dot')}
                onClick={() => {
                  clearInterval(this.autoPlay)
                  this.goToSelectedDot(index)
                }}
              >
                &middot;
              </span>
            )}
          </section>
        }
      </div>
    );
  }
}

export { Glide }
