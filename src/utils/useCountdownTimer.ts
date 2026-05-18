import { useCallback, useEffect, useRef, useState } from 'react';

export type CountdownTimerOptions = {
  interval?: number;
  skip?: boolean;
  resetOnExpire?: boolean;
  onExpire: () => void;
};

type UseCountdownTimer = {
  reset: () => void;
};

export function useCountdownTimer({
  interval = 2000,
  skip = false,
  resetOnExpire = true,
  onExpire,
}: CountdownTimerOptions): UseCountdownTimer {
  const initialCount = interval / 1000;

  const [count, setCount] = useState(initialCount);
  const onExpireRef = useRef(onExpire);

  const reset = useCallback(() => {
    setCount(initialCount);
  }, [initialCount]);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (skip) {
      return;
    }

    const id = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    if (count <= 0) {
      onExpireRef.current();
      resetOnExpire && setCount(initialCount);
    }

    return () => {
      clearInterval(id);
    };
  }, [skip, count, initialCount, resetOnExpire]);

  return {
    reset,
  };
}
