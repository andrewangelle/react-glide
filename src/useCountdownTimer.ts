import { useCallback, useEffect, useReducer } from 'react'

type Actions =
  | { type: 'START' }
  | { type: 'RESET'; payload: number }
  | { type: 'PAUSE' }
  | { type: 'RUNNING' }
  | { type: 'TICK'; payload: number }

type State = {
  canStart: boolean
  countdown: number
  isRunning: boolean
}

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        canStart: state.countdown !== 0,
      }
    case 'RESET':
      return {
        ...state,
        countdown: action.payload,
        canStart: false,
        isRunning: false,
      }
    case 'PAUSE':
      return {
        ...state,
        canStart: false,
        isRunning: false,
      }
    case 'RUNNING':
      return {
        ...state,
        isRunning: true,
      }
    case 'TICK':
      return {
        ...state,
        countdown: state.countdown - action.payload,
      }
    default:
      return state
  }
}

export type UseCountdownTimerProps = {
  timer: number
  interval?: number
  autostart?: boolean
  expireImmediate?: boolean
  resetOnExpire?: boolean
  onExpire?: () => void
  onReset?: () => void
}

export type CountdownTimerResults = {
  countdown: number
  isRunning: boolean
  start: () => void
  reset: () => void
  pause: () => void
}

export function useCountdownTimer({
  timer,
  interval = 1000,
  autostart = false,
  expireImmediate = false,
  resetOnExpire = true,
  onExpire,
  onReset,
}: UseCountdownTimerProps): CountdownTimerResults {
  const [state, dispatch] = useReducer(reducer, {
    canStart: autostart,
    countdown: timer,
    isRunning: false,
  })

  function start() {
    dispatch({ type: 'START' })
  }

  function pause() {
    dispatch({ type: 'PAUSE' })
  }

  function initStopped(time: number) {
    dispatch({ type: 'RESET', payload: time })
  }

  const reset = useCallback(() => {
    initStopped(timer)
    if (onReset && typeof onReset === 'function') {
      onReset()
    }
  }, [timer, onReset])

  const expire = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0)
    if (onExpire && typeof onExpire === 'function') {
      onExpire()
    }
  }, [timer, onExpire, resetOnExpire])

  useEffect(() => {
    function tick() {
      if (
        state.countdown / 1000 <= 0 ||
        (expireImmediate && (state.countdown - interval) / 1000 <= 0)
      ) {
        expire()
      } else {
        dispatch({ type: 'TICK', payload: interval })
      }
    }

    let id: NodeJS.Timeout
    if (state.canStart) {
      id = setInterval(tick, interval)
      if (!state.isRunning) {
        dispatch({ type: 'RUNNING' })
      }
    }
    return () => clearInterval(id)
  }, [
    expire,
    expireImmediate,
    interval,
    state.canStart,
    state.countdown,
    state.isRunning,
  ])

  return {
    countdown: state.countdown,
    isRunning: state.isRunning,
    start,
    reset,
    pause,
  }
}