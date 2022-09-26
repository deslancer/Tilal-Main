import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import s from './AvailabilityLable.module.scss';

const Label = styled.div`
    background: #11b39b;
`;

interface AvailabilityLabelProps extends React.ComponentPropsWithRef<'div'> {
    availability: 'available';
}

const AvailabilityLabel: React.FC<AvailabilityLabelProps> = ({
    children,
    availability,
    className,
    ...otherProps
}) => {
    return (
        <Label className={classNames(s.label, className)} {...otherProps}>
            <span className={s.title}>{children}</span>
            <span className={s.status}>{availability}</span>
        </Label>
    );
};

export default AvailabilityLabel;
