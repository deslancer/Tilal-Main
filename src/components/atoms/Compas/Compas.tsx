import React from 'react';
import styled from 'styled-components';
import compasImage from '../../../assets/svg/Compas.svg';

const CompasIcon = styled.img`
    width: 100%;
    height: 100%;
`;

const Compas: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
    return (
        <div {...props}>
            <CompasIcon src={compasImage} />
        </div>
    );
};

export default Compas;
