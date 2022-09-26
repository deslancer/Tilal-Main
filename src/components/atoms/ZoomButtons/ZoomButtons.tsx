import React from 'react';
import styled from 'styled-components';
import SvgIcon from '../SvgIcon';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
const Button = styled.button<{ disabled: boolean }>`
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    /* System/White */
    backdrop-filter: blur(5px);
    background: ${({ disabled }) =>
        disabled ? 'rgba(255, 255, 255, 0.5)' : '#FFFFFF'};
    font-size: 20px;
    border-radius: 2px;
    svg {
        width: 25px;
        height: 25px;
        stroke: ${({ disabled }) => (disabled ? '#636363' : '')};
    }
`;
const ZoomButtons: React.FC<
    React.ComponentPropsWithoutRef<'div'> & {
        zoomIn?: boolean;
        zoomOut?: boolean;
    }
> = ({ zoomIn = true, zoomOut = true, ...props }) => {
    return (
        <Wrapper {...props}>
            <Button disabled={!zoomIn}>
                <SvgIcon icon="plus-circle" />
            </Button>
            <Button disabled={!zoomOut}>
                <SvgIcon icon="minus-circle" />
            </Button>
        </Wrapper>
    );
};

export default ZoomButtons;
