export declare type CountdownTimerOptions = {
    interval?: number;
    skip?: boolean;
    resetOnExpire?: boolean;
    onExpire: () => void;
};
declare type UseCountdownTimer = {
    reset: () => void;
};
export declare function useCountdownTimer({ interval, skip, resetOnExpire, onExpire, }: CountdownTimerOptions): UseCountdownTimer;
export {};
