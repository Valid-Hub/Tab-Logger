import { useEffect, useState } from 'react';

export const useCompatibility = (minWidth: number): { width: number; isCompatible: boolean } => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [isCompatible, setIsCompatible] = useState<boolean>(window.innerWidth >= minWidth);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

        const handleChange = (e: MediaQueryListEvent) => {
            setIsCompatible(e.matches);
        };

        const handleResize = () => {
            setWidth(window.innerWidth);
            setIsCompatible(window.innerWidth >= minWidth);
        };

        setIsCompatible(mediaQuery.matches);
        setWidth(window.innerWidth);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [minWidth]);

    return { width, isCompatible };
};
