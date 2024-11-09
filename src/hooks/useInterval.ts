import { useEffect, useRef } from 'react';

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    const interval = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(interval);
  }, [delay]);
}

export default useInterval;
