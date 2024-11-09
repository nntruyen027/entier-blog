import { useEffect } from 'react';

function useOnClickOutside(selector: string, callback: () => void) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = document.querySelector(selector);
      if (element && !element.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selector, callback]);
}

export default useOnClickOutside;
