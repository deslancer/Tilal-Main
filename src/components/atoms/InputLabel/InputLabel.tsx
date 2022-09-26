import classNames from 'classnames';
import React from 'react';
import s from './InputLabel.module.scss';

interface InputLabelProps extends React.ComponentPropsWithoutRef<'label'> {
    text: string;
    children: React.ReactNode;
}
const InputLabel: React.FC<InputLabelProps> = ({
    text,
    children,
    className,
    ...otherProps
}) => {
    return (
        <label className={classNames(className, s.label)} {...otherProps}>
            <span className={s.text}>{text}</span>
            {children}
        </label>
    );
};

export default InputLabel;
