import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { LoadingSpinner } from '~/LoadingSpinner';
import type { GlideProps } from '~/types';
import { useCountdownTimer } from '~/useCountdownTimer';
import type { CountdownTimerOptions } from '~/useCountdownTimer';
import { usePreload } from '~/usePreload';

import './reactGlide.css';

function isChild(child: object): child is ReactElement {
  return '$$typeof' in child;
}

function isCSSUnit(unit?: object): unit is { value: number } {
  return Boolean(unit && 'value' in unit);
}

export function Glide({
  autoPlay,
  autoPlaySpeed = 5000,
  infinite = false,
  dots = true,
  height,
  width,
  className = '',
  children,
  onSlideChange = () => null,
}: GlideProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const childrenArray = Array.isArray(children) ? children.filter(isChild) : [];

  const countdownTimerOptions: CountdownTimerOptions = {
    skip: !autoPlay,
    interval: autoPlaySpeed,
    onExpire: goToNextSlide,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, done } = usePreload(childrenArray);
  const { reset: resetTimer } = useCountdownTimer(countdownTimerOptions);

  const maybeWidth = ref.current?.computedStyleMap?.().get('width');
  const containerWidth = isCSSUnit(maybeWidth) ? maybeWidth.value : 0;

  function goToNextSlide(): void {
    const lastSlide = childrenArray.length - 1;

    if (currentIndex === lastSlide && !infinite) {
      return;
    }

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

  function getStyleProps() {
    const dimensions: CSSProperties = {};

    if (height) dimensions.height = height;
    if (width) dimensions.width = width;

    return dimensions;
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
      style={getStyleProps()}
      data-testid="glideContainer"
    >
      {loading && <LoadingSpinner width={containerWidth} />}

      {done &&
        childrenArray.map((child: ReactElement, index) => {
          const classNameId = currentIndex === index ? 'current' : '';
          const className = `glide--item ${classNameId}`;
          const key = `${className}--${index}`;
          return (
            child && (
              <child.type
                key={key}
                className={className}
                {...(currentIndex === index
                  ? { 'data-testid': 'glideCurrentItem' }
                  : {})}
                {...(typeof child.props === 'object' ? child.props : {})}
              />
            )
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
