import type { CSSProperties, JSX } from 'react';
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
  onSlideChange?: () => void;
};
