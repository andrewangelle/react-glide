import { useState, useRef, useEffect } from 'react';

export type CountdownTimerOptions = {
  interval?: number,
  skip?: boolean,
  resetOnExpire?: boolean;
  onExpire: () => void,
}

type UseCountdownTimer = {
  reset: () => void;
}

export function useCountdownTimer({
  interval = 2000,
  skip = false,
  resetOnExpire = true,
  onExpire,
}: CountdownTimerOptions): UseCountdownTimer {
  const initialCount = interval / 1000;

  const [count, setCount] = useState(initialCount);
  const onExpireRef = useRef(onExpire);

  function reset(): void{
    setCount(initialCount) 
  }

  useEffect(() => {
    onExpireRef.current = onExpire;
  })

  useEffect(() => {
    let id: NodeJS.Timeout;

    if(!skip){
      id = setInterval(() => {
        setCount(prev => prev - 1)
      }, 1000)


      if(count <= 0){
        onExpireRef.current();
        resetOnExpire && setCount(initialCount)
      }
    }

    if(skip){
      // @ts-expect-error
      clearInterval(id)
    }

    return () => {
      clearInterval(id)
    }

  }, [
    skip, 
    count, 
    interval,
    initialCount, 
    resetOnExpire, 
    setCount, 
    onExpireRef
  ])

  return {
    reset
  }
}