import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import type { GlideProps } from '~/types';
import { useCountdownTimer } from '~/useCountdownTimer';
import { usePreload } from '~/usePreload';
import { isReactChild } from '~/utils';
import '~/reactGlide.css';

export function Glide({
  autoPlay,
  autoPlaySpeed = 5000,
  infinite = false,
  dots = true,
  className = '',
  children,
  onSlideChange = () => null,
}: GlideProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const childrenArray = Array.isArray(children)
    ? children.filter(isReactChild)
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, done } = usePreload(childrenArray);
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
      ref={ref}
      className={`${className} glide--container`}
      data-testid="glideContainer"
    >
      {loading && <div className="loading-indicator" />}

      {done &&
        childrenArray.map((child: ReactElement, index) => {
          const classNameId = currentIndex === index ? 'current' : '';
          const className = `glide--item ${classNameId}`;
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
        <section className="glide--dots">
          {childrenArray.map((_child, index) => {
            const className =
              currentIndex === index ? 'active-dot' : 'inactive-dot';
            const key = `${className}--${index}`;
            return (
              <span
                // biome-ignore lint/a11y/useSemanticElements: breaks the styles to make this a button el
                role="button"
                key={key}
                data-testid={`glideDot-${index}`}
                className={className}
                tabIndex={0}
                onClick={() => goToSelectedDot(index)}
                onKeyDown={(event) => {
                  switch (event.key) {
                    case ' ':
                    case 'Enter':
                      goToSelectedDot(index);
                  }
                }}
              >
                &middot;
              </span>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default Glide;
