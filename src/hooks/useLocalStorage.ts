import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T>(storedValue ? JSON.parse(storedValue) : initialValue);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
