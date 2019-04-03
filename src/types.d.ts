
import { GlideProps, GlideState } from './Glide';

export interface SpinnerProps {
  width: number
}

export interface PreloaderProps extends GlideProps, GlideState {
  currentIndex: number;
  startTimer: () => void;
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
  loadCount: number;
}