import { useEffect, useState } from "react";

/**
 * debounces a stateful value
 * @param val value to debounce
 * @param delay delay value for setTimeout
 */
const useDebounce = <T>(val: T, delay: number): T => {
  const [debouncedVal, setDebouncedVal] = useState(val);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [val, delay]);

  return debouncedVal;
};

export default useDebounce;
