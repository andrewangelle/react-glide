import type { ReactElement } from 'react';

export function isReactChild(child?: object): child is ReactElement {
  return Boolean(child && '$$typeof' in child);
}

export function isCSSUnit(unit?: object): unit is { value: number } {
  return Boolean(unit && 'value' in unit);
}
