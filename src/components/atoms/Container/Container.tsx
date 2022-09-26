import classNames from 'classnames';
import React from 'react';
import sMain from '../../../styles/Main.module.scss';
const Container: React.FC<React.ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...otherProps
}) => {
    return (
        <div
            className={classNames(className, sMain.container)}
            {...otherProps}
        />
    );
};

export default Container;
