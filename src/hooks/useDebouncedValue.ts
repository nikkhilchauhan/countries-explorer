import { useEffect, useRef, useState } from 'react';

export const useDebouncedValue = <T>(value: T, delayMs: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const mountedRef = useRef(true);

  // Set the mounted ref to true on mount and false on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Set the debounced value after the delay
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (mountedRef.current) {
        setDebouncedValue(value);
      }
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delayMs]);

  return debouncedValue;
};
