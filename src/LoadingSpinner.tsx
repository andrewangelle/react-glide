import React from 'react';
import './reactGlide.css';

export function LoadingSpinner({ width }: { width: number | string }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${(parseInt(width.toString(), 10) / 66) * 50}px`
      }}
    >
      <div className="loading-indicator" />
    </div>
  );
}
