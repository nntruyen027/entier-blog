import { useState } from 'react';

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
}

export default useToggle;
