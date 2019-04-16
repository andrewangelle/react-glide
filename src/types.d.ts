
export interface PreloaderProps {
  currentIndex: number;
  autoPlay?: boolean;
  width: number;
  startTimer: () => void;
}

export interface PreloaderState {
  loading: boolean;
  done: boolean;
  loadCount: number;
}