import React from 'react';
import './index.css';
interface GlideProps {
    images?: string[];
    width: number;
    autoPlay?: boolean;
    autoPlaySpeed?: number;
    infinite?: boolean;
    dots?: boolean;
    onSlideChange: () => void;
}
interface GlideState {
    currentIndex: number;
    imagesLoaded: boolean;
}
export declare class Glide extends React.Component<GlideProps, GlideState> {
    autoPlay: any;
    state: GlideState;
    startTimer(): void;
    goToSelectedDot(index: number): void;
    goToPrevSlide(): void;
    goToNextSlide(): void;
    componentDidMount(): void;
    componentWillUpdate(nextProps: GlideProps, nextGlideState: any): void;
    render(): JSX.Element;
}
export {};
