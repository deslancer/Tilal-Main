import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Checkbox3D.module.scss";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
    item?: { properties: { id: string } } | undefined;
    setCurrentRoute?: any;
    active?: boolean;
}

const Checkbox3D: React.FC<CheckboxProps> = ({
    children,
    item,
    setCurrentRoute,
    className,
    ...otherProps
}) => {
    const [isActive, setActive] = useState(false);
    const onChangeHandler = useCallback(() => {
        setActive(current => !current)
    }, [item?.properties.id,]);



    return (

        <label className={classNames(s.wrapper, className)}>
            <input
                checked={isActive}
                onChange={onChangeHandler}
                className={s.input}
                type="checkbox"
                {...otherProps}
            />
            <div className={classNames(s.checkbox, isActive && s.checkbox__active)}></div>
            <span className={s.text}>{children}</span>
        </label>
    );
};

export default Checkbox3D;
