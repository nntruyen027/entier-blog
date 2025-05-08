import { useEffect, useState } from 'react';
import { getParamByKey } from '~/redux/param/api';

export default function useParamValue(key: string) {
  const [value, setValue] = useState<string | null | any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const { value } = await getParamByKey(key);
        setValue(value);
      } catch (err) {
        console.error(`Lỗi khi lấy tham số với key "${key}":`, err);
        setError(err as Error);
      }
    };

    fetchValue();
  }, [key]);

  return { value, error };
}
