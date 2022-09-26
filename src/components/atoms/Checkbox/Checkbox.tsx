import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import s from './Checkbox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {}
const Checkbox: React.FC<CheckboxProps> = ({
    children,
    className,
    ...otherProps
}) => {
    const [active, setActive] = useState<boolean>(false);
    const onChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setActive(event.target.checked);
        },
        [setActive]
    );

    return (
        <label className={classNames(s.wrapper, className)}>
            <input
                checked={active}
                onChange={onChangeHandler}
                className={s.input}
                type="checkbox"
                {...otherProps}
            />
            <div
                className={classNames(s.checkbox, active && s.checkbox__active)}
            ></div>
            <span className={s.text}>{children}</span>
        </label>
    );
};

export default Checkbox;
