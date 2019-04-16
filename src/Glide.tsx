import React, { ReactChild, Component } from 'react';

import { Preloader } from './Preloader';
import './reactGlide.css';

export interface GlideState {
  currentIndex: number;
  cancelTimer: boolean;
}

export interface GlideProps {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  height?: number;
  infinite?: boolean;
  width: number;
  onSlideChange?: () => void;
}

class Glide extends Component<GlideProps, GlideState> {
  autoPlay: NodeJS.Timeout;

  state: GlideState = {
    currentIndex: 0,
    cancelTimer: true
  }

  componentWillUnmount() {
    clearInterval(this.autoPlay)
  }

  componentDidUpdate(_prevProps: GlideProps, prevState: GlideState) {
    // destructure props and state values
    const { currentIndex: prevIndex } = prevState;
    const { currentIndex } = this.state;
    const { onSlideChange = () => null } = this.props;

    // diff the changes
    const indexUpdated = currentIndex !== prevIndex;
    const cancelTimer = this.state.cancelTimer !== prevState.cancelTimer && this.state.cancelTimer

    if (indexUpdated) {
      onSlideChange();

      if (this.props.autoPlay && !this.state.cancelTimer) {
        this.startTimer()
      }
    }

    if(cancelTimer){
      clearInterval(this.autoPlay)
    }
  }

  startTimer = () =>
    this.setState({cancelTimer: false},
      () => {
        if (this.props.autoPlay) {
          const { autoPlaySpeed = 5000 } = this.props;
          this.autoPlay = setTimeout(
            () => this.goToNextSlide(),
            autoPlaySpeed
          );
        }

      }
    )
  ;

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

  onNextButtonClick = () => {
    this.setState(
      {cancelTimer: true},
      () => this.goToNextSlide()
    )
  }

  onPrevButtonClick = () => {
    this.setState(
      {cancelTimer: true},
      () => this.goToPrevSlide()
    )
  }

  onDotClick = (index: number) => {
    this.setState(
      {cancelTimer: true},
      () => this.goToSelectedDot(index)
    )
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

export { Glide }
