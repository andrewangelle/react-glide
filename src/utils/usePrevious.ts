import { useEffect, useRef } from 'react';

export function usePrevious<DataType>(value: DataType): DataType {
  const ref = useRef<DataType>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current as DataType;
}
