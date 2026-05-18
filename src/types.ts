import type { CSSProperties, JSX, Ref } from 'react';
export type PreloaderProps = {
  currentIndex: number;
  width: number;
};

export type PreloaderState = {
  loading: boolean;
  done: boolean;
  loadCount: number;
};

export type GlideState = {
  currentIndex: number;
};

export type GlideProps = {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  infinite?: boolean;
  className?: string;
  children?: string | JSX.Element | JSX.Element[];
  containerStyles?: CSSProperties;
  loading?: boolean;
  swipeable?: boolean;
  scrollBehavior?: ScrollBehavior;
  ref?: Ref<HTMLDivElement | null> | null;
  onSlideChange?: () => void;
};
