import type { ReactElement } from 'react';

export function isReactChild(child?: object): child is ReactElement {
  return Boolean(child && '$$typeof' in child);
}
