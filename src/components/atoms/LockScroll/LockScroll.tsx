import React, { useEffect, useInsertionEffect, useRef } from 'react';
import styled from 'styled-components';

const LockScrollWrapper = styled.div<{ lock: boolean }>`
    position: ${(props) => (props.lock ? 'fixed' : 'unset')};
    top: ${(props) =>
        props.lock
            ? typeof window !== 'undefined' && -window.scrollY + 'px'
            : 'unset'};
    overflow-x: ${(props) => (props.lock ? 'hidden' : 'unset')};
    overflow-y: ${(props) => (props.lock ? 'hidden' : 'unset')};
    width: 100%;
    min-height: 100vh;
`;

export const LockScroll: React.FC<{
    lock: boolean;
    children?: React.ReactNode;
}> = ({ lock, children }) => {
    const scrollY = useRef<number>(0);
    if (lock)
        scrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;

    useEffect(() => {
        if (!lock) window.scrollTo({ top: scrollY.current });
    }, [lock]);
    return <LockScrollWrapper lock={lock}>{children}</LockScrollWrapper>;
};

export default LockScroll;
