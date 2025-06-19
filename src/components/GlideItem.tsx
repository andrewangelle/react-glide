import { Children, useEffect, useRef } from 'react';
import type { GlideProps } from '~/types';
import { classnames } from '~/utils/classnames';
import { isReactChild } from '~/utils/isReactChild';
import { useIntersectionObserver } from '~/utils/useIntersectionObserver';

type GlideItemProps = Pick<
  GlideProps,
  'swipeable' | 'scrollBehavior' | 'loading' | 'children'
> & {
  isActive: boolean;
  count: number;
  goToSelectedDot: () => void;
};

export function GlideItem({
  isActive,
  loading = true,
  swipeable = false,
  scrollBehavior,
  children,
  goToSelectedDot,
}: GlideItemProps) {
  const { isIntersecting, ref } = useIntersectionObserver({
    root: null,
    threshold: 0.3,
    onChange(isIntersecting) {
      if (isIntersecting && swipeable && !loading) {
        goToSelectedDot();
      }
    },
  });
  const listItemRef = useRef<HTMLLIElement | null>(null);
  const child = Children.only(children);

  useEffect(() => {
    if (swipeable && !isIntersecting && isActive) {
      listItemRef.current?.scrollIntoView({
        behavior: scrollBehavior,
      });
    }
  }, [swipeable, isIntersecting, scrollBehavior, isActive]);

  return (
    isReactChild(child) && (
      <li
        ref={listItemRef}
        data-testid={isActive ? 'glideCurrentItem' : ''}
        className={classnames(
          'glide--item',
          swipeable ? 'swipeable' : 'animated',
          isActive && 'current',
        )}
      >
        <child.type ref={ref} {...(child?.props ?? {})} />
      </li>
    )
  );
}
