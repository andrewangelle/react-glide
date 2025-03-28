import type { JSX } from 'react';
export interface PreloaderProps {
  currentIndex: number;
  width: number;
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
  loadCount: number;
}

export interface GlideState {
  currentIndex: number;
}

export interface GlideProps {
  autoPlay?: boolean;
  autoPlaySpeed?: number;
  dots?: boolean;
  height?: number;
  infinite?: boolean;
  width?: number | string;
  className?: string;
  children: string | JSX.Element | JSX.Element[];
  onSlideChange?: () => void;
}
