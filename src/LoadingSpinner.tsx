import React from 'react';
import { SpinnerProps } from './types';

function LoadingSpinner({ width }: SpinnerProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${(width / 66) * 50}px`
      }}
    >
      <div className="loading-indicator" />
    </div>
  )
}

export { LoadingSpinner }


