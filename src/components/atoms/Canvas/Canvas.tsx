import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowSize';

const CanvasElemnt = styled.canvas`
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
    inset: 0;
`;
const Canvas: React.FC<React.ComponentPropsWithoutRef<'canvas'>> = (props) => {
    const scaleProperties = useWindowSize();
    return <CanvasElemnt {...props} {...scaleProperties} />;
};

export default Canvas;
