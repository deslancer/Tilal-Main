import classNames from 'classnames';
import React from 'react';
import Button from '../../Button';
import s from './TypeButton.module.scss';

interface TypeButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    subtext?: React.ReactNode;
    active?: boolean;
}
const TypeButton: React.FC<TypeButtonProps> = ({
    children,
    subtext,
    className,
    active,
    ...otherProps
}) => {
    subtext = 'Type';
    return (
        <Button
            mode={active ? 'active' : 'main'}
            className={classNames(className, s.button)}
            {...otherProps}
        >
            <span className={s.type}>{children}</span>
            <span className={s.subtext}>{subtext}</span>
        </Button>
    );
};

export default TypeButton;
