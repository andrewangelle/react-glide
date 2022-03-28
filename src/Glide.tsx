import React, { ReactChild, useState, useEffect, PropsWithChildren, ReactElement, Children } from 'react';

import { LoadingSpinner } from './LoadingSpinner';

import { GlideProps } from './types';
import { useCountdownTimer } from './useCountdownTimer';
import { usePreload } from './usePreload';

import './reactGlide.css';

export function Glide({
  autoPlay,
  autoPlaySpeed = 5000,
  infinite = false,
  dots=true,
  height, 
  width,
  onSlideChange = () => null,
  children
}: PropsWithChildren<GlideProps>){
  const childrenArray = Children.toArray(children) as ReactElement[];
  const countdownTimerOptions = {
    autostart: autoPlay,
    timer: autoPlaySpeed,
    resetOnExpire: true,
    onExpire: goToNextSlide,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, done } = usePreload(childrenArray)
  const {
    start: startTimer,
    reset: resetTimer
  } = useCountdownTimer(countdownTimerOptions);

  function goToNextSlide(){
    const lastSlide = React.Children.toArray(children).length - 1;
    
    if(currentIndex === lastSlide && !infinite){
      return
    }

    const nextIndex = currentIndex === lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(prevState => nextIndex);
    resetTimer()
    startTimer()
  }

  function goToPrevSlide(){
    const lastSlide = React.Children.toArray(children).length - 1;
    const nextIndex = currentIndex === 0 ? lastSlide : currentIndex - 1;
    setCurrentIndex(prevState => nextIndex);
    resetTimer()
    startTimer()

  }

  function goToSelectedDot(index: number){
    setCurrentIndex(prevState => index);
    resetTimer()
    startTimer()
  }

  useEffect(() => {
    if(currentIndex){
      onSlideChange()
    }
  }, [currentIndex]);


  const styleProps = {
    height,
    width
  };

  return (
    <div 
      className="glide--container" 
      style={styleProps}
      data-testid='glideContainer'
    >
      {loading && <LoadingSpinner width={width} />}

      {done && React.Children.map(children, (child: ReactElement, index) => {
        const className = currentIndex === index ? 'current' : '';
        return (
          child && (
            <child.type
              className={`glide--item ${className}`}
              {...currentIndex === index ? {'data-testid': "glideCurrentItem"} : {}}
              {...child.props}
            />
          )
        )})}
        
      {(infinite || currentIndex !== 0) && (
        <button 
          className="glide--prev-btn" 
          data-testid={`goToPrevSlide`}
          onClick={goToPrevSlide}
        >
          &#10094;
        </button>
      )}

      {(infinite ||
        currentIndex !== (children as ReactChild[]).length - 1) && (
        <button 
          className="glide--next-btn"
          data-testid={`goToNextSlide`}
          onClick={goToNextSlide}
        >
          &#10095;
        </button>
      )}

      {dots && (
        <section className="glide--dots">
          {React.Children.map(children, (child, index) => (
            <span
              key={index}
              data-testid={`glideDot-${index}`}
              className={
                currentIndex === index ? 'active-dot' : 'inactive-dot'
              }
              onClick={() => goToSelectedDot(index)}
            >
              &middot;
            </span>
          ))}
        </section>
      )}
    </div>    
  )
}
