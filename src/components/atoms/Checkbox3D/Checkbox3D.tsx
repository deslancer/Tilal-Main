import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import s from "./Checkbox3D.module.scss";
import {findHouseByProp} from "../../../map-3D/findHouseByProp";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
    property: string;
    value: string;
    item?: { properties: { id: string } } | undefined;
    setCurrentRoute?: any;
    active?: boolean;
}

const Checkbox3D: React.FC<CheckboxProps> = ({
    property,
    value,
    item,
    setCurrentRoute,
    className,
    ...otherProps
}) => {
    const [isActive, setActive] = useState(false);
    let checked = false;
    const onChangeHandler = useCallback(() => {
        setActive(current => !current)
        checked = !checked
        findHouseByProp(property, value, checked);

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
            <span className={s.text}>{value}</span>
        </label>
    );
};

export default Checkbox3D;
