import classNames from 'classnames';
import React from 'react';
import s from './ConstantFormField.module.scss';

const ConstantFormField: React.FC<React.ComponentPropsWithoutRef<'span'>> = ({
    className,
    ...otherProps
}) => {
    return <span className={classNames(className, s.field)} {...otherProps} />;
};

export default ConstantFormField;
