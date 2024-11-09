import { useEffect } from 'react';
function useEventListener(eventName, handler, element = window) {
    useEffect(() => {
        const targetElement = element || window;
        targetElement.addEventListener(eventName, handler);
        return () => {
            targetElement.removeEventListener(eventName, handler);
        };
    }, [eventName, handler, element]);
}
export default useEventListener;
