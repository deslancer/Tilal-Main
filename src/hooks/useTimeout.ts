import React from 'react';

const useTimeout = <T extends Function>(callback: T, delay: number) => {
    const savedCallback = React.useRef<T>(callback);

    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };
        const id = setTimeout(tick, delay);
        return () => clearTimeout(id);
    }, [delay]);
};

export default useTimeout;
