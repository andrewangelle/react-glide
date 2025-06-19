import type { ReactElement } from 'react';

export function isReactChild(child?: unknown): child is ReactElement {
  return Boolean(child && '$$typeof' in (child as object));
}
