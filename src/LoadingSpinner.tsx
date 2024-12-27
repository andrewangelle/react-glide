import React from 'react';
import './reactGlide.css';

export function LoadingSpinner({
  width,
}: { width: number | string }): JSX.Element {
  const baseWidth =
    typeof width === 'string' ? Number.parseInt(width, 10) : width;
  return (
    <div
      style={{
        width: `${baseWidth}px`,
        height: `${(baseWidth / 66) * 50}px`,
      }}
    >
      <div className="loading-indicator" />
    </div>
  );
}
