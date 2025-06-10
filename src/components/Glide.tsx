import { useEffect, useRef, useState } from 'react';
import { GlideItem } from '~/components/GlideItem';
import type { GlideProps } from '~/types';
import { classnames } from '~/utils/classnames';
import { isReactChild } from '~/utils/isReactChild';
import { useComposedRefs } from '~/utils/useComposedRefs';
import { useCountdownTimer } from '~/utils/useCountdownTimer';
import { usePrevious } from '~/utils/usePrevious';

export function Glide({
  autoPlay = false,
  autoPlaySpeed = 5000,
  infinite = false,
  dots = true,
  className = '',
  containerStyles = {},
  loading = false,
  animate = false,
  scrollBehavior = 'smooth',
  ref: usersRef,
  onSlideChange = () => null,
  ...props
}: GlideProps) {
  const children = Array.isArray(props.children)
    ? props.children.filter(isReactChild)
    : [];

  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useComposedRefs<HTMLDivElement | null>(
    usersRef,
    innerRef,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const previousIndex = usePrevious(currentIndex);
  const [shouldSkipSmoothScroll, setShouldSkipSmoothScroll] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useCountdownTimer({
    interval: 250,
    onExpire() {
      setIsFirstLoad(false);
    },
  });

  const { reset: resetTimer } = useCountdownTimer({
    skip: !autoPlay || isFirstLoad,
    interval: autoPlaySpeed,
    onExpire() {
      const lastSlide = children.length - 1;

      if (currentIndex === lastSlide && !infinite) {
        return;
      }

      goToNextSlide();
    },
  });

  function goToNextSlide(): void {
    const lastSlide = children.length - 1;
    const nextIndex = currentIndex === lastSlide ? 0 : currentIndex + 1;

    if (nextIndex === 0 && currentIndex === lastSlide) {
      setShouldSkipSmoothScroll(true);
    }

    setCurrentIndex((_prevState) => nextIndex);
    resetTimer();
  }

  function goToPrevSlide(): void {
    const lastSlide = children.length - 1;
    const nextIndex = currentIndex === 0 ? lastSlide : currentIndex - 1;

    if (nextIndex === lastSlide && currentIndex === 0) {
      setShouldSkipSmoothScroll(true);
    }

    setCurrentIndex((_prevState) => nextIndex);
    resetTimer();
  }

  function goToSelectedDot(index: number) {
    setCurrentIndex(index);
    resetTimer();
  }

  useEffect(() => {
    if (previousIndex !== currentIndex) {
      onSlideChange();
    }

    const shouldResetSmoothScrollSkip =
      shouldSkipSmoothScroll &&
      (currentIndex === 0 || currentIndex === children.length - 1);

    if (shouldResetSmoothScrollSkip) {
      setShouldSkipSmoothScroll(false);
    }
  }, [
    previousIndex,
    onSlideChange,
    currentIndex,
    shouldSkipSmoothScroll,
    children.length,
  ]);

  return (
    <div
      data-testid="glideContainer"
      ref={containerRef}
      className={classnames(
        className,
        'glide--container',
        !animate && 'swipeable',
      )}
      style={containerStyles}
    >
      {(loading || isFirstLoad) && (
        <div className="glide--loading" data-testid="loader" />
      )}

      {!loading && (
        <ul style={{ display: !isFirstLoad ? undefined : 'none' }}>
          {children.map((child, index) => {
            const key = `glideItem-${index}`;
            return (
              <GlideItem
                key={key}
                loading={loading}
                count={children.length}
                scrollBehavior={
                  shouldSkipSmoothScroll ? 'instant' : scrollBehavior
                }
                animate={animate}
                isActive={currentIndex === index}
                goToSelectedDot={() => goToSelectedDot(index)}
              >
                {child}
              </GlideItem>
            );
          })}
        </ul>
      )}

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

      {(infinite || currentIndex !== children.length - 1) && (
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
          {children.map((_child, index) => {
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
