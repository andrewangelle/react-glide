import React, { ReactChild, Component } from 'react';

import { Preloader } from './Preloader';
import { GlideProps, GlideState } from './types';

import './reactGlide.css';

class Glide extends Component<GlideProps, GlideState> {
  autoPlay: NodeJS.Timeout;

  state: GlideState = {
    currentIndex: 0
  }

  componentWillUnmount() {
    clearTimeout(this.autoPlay)
  }

  componentDidUpdate(_prevProps: GlideProps, prevState: GlideState) {
    const { currentIndex: prevIndex } = prevState;
    const { currentIndex } = this.state;
    const { onSlideChange, autoPlay } = this.props;

    if(currentIndex !== prevIndex) {

      // check if user has defined these props
      if(onSlideChange){
        onSlideChange();
      }

      if(autoPlay) {
        this.startTimer()
      }
    }
  }

  startTimer = () => {
    const { autoPlaySpeed = 5000 } = this.props;
    this.autoPlay = setTimeout(
      () => this.goToNextSlide(),
      autoPlaySpeed
    );
  };

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

  onDotClick = (index: number) => {
    this.goToSelectedDot(index);
    this.handleTimerOnClick()
  }

  onNextButtonClick = () => {
    this.goToNextSlide();
    this.handleTimerOnClick()
  }

  onPrevButtonClick = () => {
    this.goToPrevSlide();
    this.handleTimerOnClick()
  }

  handleTimerOnClick = () => {
    if(this.props.autoPlay){
      clearTimeout(this.autoPlay);
    }
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
      <div
        className="glide--container"
        style={styleProps}
      >

        <Preloader
          startTimer={this.startTimer}
          currentIndex={currentIndex}
          width={this.props.width}
          autoPlay={this.props.autoPlay}
        >
          {children}
        </Preloader>

        {(infinite || currentIndex !== 0) &&
          <button
            className="glide--prev-btn"
            onClick={this.onPrevButtonClick}
          >
            &#10094;
          </button>
        }

        {(infinite || currentIndex !== (children as ReactChild[]).length - 1) &&
          <button
            className="glide--next-btn"
            onClick={this.onNextButtonClick}
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
                onClick={() => this.onDotClick(index)}
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

export default Glide