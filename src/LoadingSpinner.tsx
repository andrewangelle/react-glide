import React from 'react';

interface SpinnerProps {
  width: number
}

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


