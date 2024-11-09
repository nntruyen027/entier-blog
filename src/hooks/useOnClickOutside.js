import { useEffect } from 'react';
function useOnClickOutside(selector, callback) {
    useEffect(() => {
        const handleClick = (event) => {
            const element = document.querySelector(selector);
            if (element && !element.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [selector, callback]);
}
export default useOnClickOutside;
