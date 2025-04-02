import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { GlideProps } from '~/types';
import { useCountdownTimer } from '~/useCountdownTimer';
import { isReactChild } from '~/utils';

export function Glide({
  autoPlay,
  autoPlaySpeed = 5000,
  infinite = false,
  dots = true,
  className = '',
  containerStyles = {},
  loading = false,
  children,
  onSlideChange = () => null,
}: GlideProps) {
  const childrenArray = Array.isArray(children)
    ? children.filter(isReactChild)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const { reset: resetTimer } = useCountdownTimer({
    skip: !autoPlay,
    interval: autoPlaySpeed,
    onExpire() {
      const lastSlide = childrenArray.length - 1;

      if (currentIndex === lastSlide && !infinite) {
        return;
      }

      goToNextSlide();
    },
  });

  function goToNextSlide(): void {
    const lastSlide = childrenArray.length - 1;
    const nextIndex = currentIndex === lastSlide ? 0 : currentIndex + 1;

    setCurrentIndex((_prevState) => nextIndex);
    resetTimer();
  }

  function goToPrevSlide(): void {
    const lastSlide = childrenArray.length - 1;
    const nextIndex = currentIndex === 0 ? lastSlide : currentIndex - 1;
    setCurrentIndex((_prevState) => nextIndex);
    resetTimer();
  }

  function goToSelectedDot(index: number): void {
    setCurrentIndex((_prevState) => index);
    resetTimer();
  }

  useEffect(() => {
    if (currentIndex) {
      onSlideChange();
    }
  }, [currentIndex, onSlideChange]);

  return (
    <div
      className={`${className} glide--container`}
      style={containerStyles}
      data-testid="glideContainer"
    >
      {loading && <div className="glide--loading" data-testid="loader" />}

      {!loading &&
        childrenArray.map((child: ReactElement, index) => {
          const current = currentIndex === index ? 'current' : '';
          const className = `glide--item ${current}`;
          const key = `${className}--${index}`;

          function getSlideItemProps() {
            let props = {};

            if (currentIndex === index) {
              props['data-testid'] = 'glideCurrentItem';
            }

            if (typeof child.props === 'object') {
              props = { ...props, ...child.props };
            }

            return props;
          }

          return (
            <child.type
              key={key}
              className={className}
              {...getSlideItemProps()}
            />
          );
        })}

      {(infinite || currentIndex !== 0) && (
        <button
          type="button"
          className="glide--prev-btn"
          data-testid="goToPrevSlide"
          onClick={goToPrevSlide}
        >
          &#10094;
        </button>
      )}

      {(infinite || currentIndex !== childrenArray.length - 1) && (
        <button
          type="button"
          className="glide--next-btn"
          data-testid="goToNextSlide"
          onClick={goToNextSlide}
        >
          &#10095;
        </button>
      )}

      {dots && (
        <section className="glide--dots-container">
          {childrenArray.map((_child, index) => {
            const className = currentIndex === index ? 'active' : '';
            const key = `${className}--${index}`;
            return (
              <button
                type="button"
                key={key}
                data-testid={`glideDot-${index}`}
                className={`glide--dot ${className}`}
                onClick={() => goToSelectedDot(index)}
              />
            );
          })}
        </section>
      )}
    </div>
  );
}

export default Glide;
