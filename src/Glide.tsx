import React, { useState, useEffect, PropsWithChildren, ReactElement, Children } from 'react';

import { LoadingSpinner } from './LoadingSpinner';

import { GlideProps } from './types';
import { useCountdownTimer, CountdownTimerOptions } from './useCountdownTimer';
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
}: PropsWithChildren<GlideProps>): JSX.Element {
  const childrenArray = Children.toArray(children) as ReactElement[];

  const countdownTimerOptions: CountdownTimerOptions = {
    skip: !autoPlay,
    interval: autoPlaySpeed,
    onExpire: goToNextSlide,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, done } = usePreload(childrenArray)
  const {
    reset: resetTimer
  } = useCountdownTimer(countdownTimerOptions);

  function goToNextSlide(): void {
    const lastSlide = childrenArray.length - 1;
    
    if(currentIndex === lastSlide && !infinite){
      return
    }

    const nextIndex = currentIndex === lastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(prevState => nextIndex);
    resetTimer()
  }

  function goToPrevSlide(): void {
    const lastSlide = childrenArray.length - 1;
    const nextIndex = currentIndex === 0 ? lastSlide : currentIndex - 1;
    setCurrentIndex(prevState => nextIndex);
    resetTimer()
  }

  function goToSelectedDot(index: number): void {
    setCurrentIndex(prevState => index);
    resetTimer()
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

      {done && Children.map(children, (child: ReactElement, index) => {
        const className = currentIndex === index ? 'current' : '';
        return (
          child && (
            <child.type
              key={index}
              className={`glide--item ${className}`}
              {...currentIndex === index ? {'data-testid': 'glideCurrentItem'} : {}}
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
        currentIndex !== childrenArray.length - 1) && (
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
          {Children.map(children, (_child, index) => (
            <span
              key={index}
              role='button'
              data-testid={`glideDot-${index}`}
              className={
                currentIndex === index ? 'active-dot' : 'inactive-dot'
              }
              tabIndex={0}
              onClick={() => goToSelectedDot(index)}
              onKeyDown={event => {
                switch(event.key){
                  case ' ':
                  case 'Enter':
                    goToSelectedDot(index)
                }
              }}
            >
              &middot;
            </span>
          ))}
        </section>
      )}
    </div>    
  )
}
