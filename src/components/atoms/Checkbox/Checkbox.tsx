import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Checkbox.module.scss";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
    item?: { properties: { id: string } } | undefined;
    animateRoute?: any;
    removeRoute?: any;
    setCurrentRoute?: any;
    active?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
    children,
    item,
    animateRoute,
    removeRoute,
    setCurrentRoute,
    active,
    className,
    ...otherProps
}) => {
    const onChangeHandler = useCallback(() => {
        if (active) {
            removeRoute();
            setCurrentRoute(null);
        } else {
            setCurrentRoute(item?.properties.id);
        }
    }, [active, item?.properties.id, removeRoute, setCurrentRoute]);

    useEffect(() => {
        if (active) {
            animateRoute(item);
        }
    }, [active, animateRoute, item, removeRoute]);

    return (
        <label className={classNames(s.wrapper, className)}>
            <input
                checked={active}
                onChange={onChangeHandler}
                className={s.input}
                type="checkbox"
                {...otherProps}
            />
            <div className={classNames(s.checkbox, active && s.checkbox__active)}></div>
            <span className={s.text}>{children}</span>
        </label>
    );
};

export default Checkbox;
