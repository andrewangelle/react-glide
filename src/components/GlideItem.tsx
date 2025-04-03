import { Children, useEffect, useRef } from 'react';
import type { Ref, RefObject } from 'react';
import type { GlideProps } from '~/types';
import { classnames } from '~/utils/classnames';
import { isReactChild } from '~/utils/isReactChild';
import { useIntersectionObserver } from '~/utils/useIntersectionObserver';

type GlideItemProps = Pick<
  GlideProps,
  'animate' | 'scrollBehavior' | 'loading' | 'children'
> & {
  isActive: boolean;
  count: number;
  containerRef: Ref<HTMLDivElement | null>;
  goToSelectedDot: () => void;
};

export function GlideItem({
  isActive,
  loading,
  animate = false,
  scrollBehavior,
  containerRef,
  children,
  goToSelectedDot,
}: GlideItemProps) {
  const root = (containerRef as RefObject<HTMLLIElement | null>).current;
  const { isIntersecting, ref } = useIntersectionObserver({
    root,
    threshold: 0.2,
    onChange(isIntersecting) {
      if (isIntersecting && !animate && !loading) {
        goToSelectedDot();
      }
    },
  });
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const child = Children.only(children);

  useEffect(() => {
    if (!animate && !isIntersecting && isActive) {
      listItemRef.current?.scrollIntoView({
        behavior: scrollBehavior,
      });
    }
  }, [animate, isIntersecting, scrollBehavior, isActive]);

  return (
    isReactChild(child) && (
      <li
        ref={listItemRef}
        data-testid={isActive ? 'glideCurrentItem' : ''}
        className={classnames(
          'glide--item',
          animate && 'animated',
          !animate && 'swipeable',
          isActive && 'current',
        )}
      >
        <child.type ref={ref} {...(child?.props ?? {})} />
      </li>
    )
  );
}
