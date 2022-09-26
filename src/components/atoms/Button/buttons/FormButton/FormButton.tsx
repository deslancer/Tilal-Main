import classNames from 'classnames';
import React from 'react';
import Button, { ButtonProps } from '../../Button';
import s from './FormButton.module.scss';

const FormButton: React.FC<
    React.ComponentPropsWithoutRef<'button'> & ButtonProps
> = ({ className, ...otherProps }) => {
    return (
        <Button className={classNames(className, s.button)} {...otherProps} />
    );
};

export default FormButton;
