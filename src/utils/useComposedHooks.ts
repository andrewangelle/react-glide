import { useCallback } from 'react';
import type { Ref } from 'react';
export type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

export function composeRefs<T>(
  ...refs: Array<PossibleRef<T>>
): (node: T) => void {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}

export function useComposedRefs<T>(
  ...refs: Array<PossibleRef<T>>
): (node: T) => void {
  return useCallback(composeRefs(...refs), refs);
}
