import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type { GlideProps } from '~/types';
import { classnames } from '~/utils/classnames';
import { isReactChild } from '~/utils/isReactChild';
import { useCountdownTimer } from '~/utils/useCountdownTimer';
import { useComposedRefs } from './utils/useComposedHooks';

export function Glide({
  autoPlay,
  autoPlaySpeed = 5000,
  infinite = false,
  dots = true,
  className = '',
  containerStyles = {},
  loading = false,
  animate = true,
  animationType = 'slide',
  ref: usersRef,
  children,
  onSlideChange = () => null,
}: GlideProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const mergedRefs = useComposedRefs<HTMLDivElement>(usersRef, innerRef);
  const childrenArray = Array.isArray(children)
    ? children.filter(isReactChild)
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { reset: resetTimer } = useCountdownTimer({
    skip: !autoPlay || loading,
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
      ref={mergedRefs}
      className={`${className} glide--container`}
      style={containerStyles}
      data-testid="glideContainer"
    >
      {loading && <div className="glide--loading" data-testid="loader" />}

      {!loading &&
        childrenArray.map((child: ReactElement, index) => {
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
              className={classnames(
                'glide--item',
                animate && 'animate',
                animate && animationType,
                currentIndex - 1 === index && 'previous',
                currentIndex === index && 'current',
              )}
              {...getSlideItemProps()}
            />
          );
        })}

      {(infinite || currentIndex !== 0) && (
        <button
          type="button"
          className="glide--button previous"
          data-testid="goToPrevSlide"
          disabled={loading}
          onClick={goToPrevSlide}
        >
          &#10094;
        </button>
      )}

      {(infinite || currentIndex !== childrenArray.length - 1) && (
        <button
          type="button"
          className="glide--button next"
          data-testid="goToNextSlide"
          disabled={loading}
          onClick={goToNextSlide}
        >
          &#10095;
        </button>
      )}

      {dots && (
        <section className="glide--dots">
          {childrenArray.map((_child, index) => {
            const className = currentIndex === index ? 'active' : '';
            const key = `${className}--${index}`;
            return (
              <button
                type="button"
                key={key}
                data-testid={`glideDot-${index}`}
                className={`glide--dot ${className}`}
                disabled={loading}
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
