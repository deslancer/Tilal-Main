import classNames from 'classnames';
import React from 'react';
import s from './TextInput.module.scss';

interface TextInputProps extends React.ComponentPropsWithoutRef<'input'> {
    error?: string;
}
const TextInput: React.FC<TextInputProps> = ({
    error,
    className,
    ...otherProps
}) => {
    return <input className={classNames(className, s.input)} {...otherProps} />;
};

export default TextInput;
