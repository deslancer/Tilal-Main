import classNames from "classnames";
import React from "react";
import Checkbox from "../Checkbox";
import s from "./FilterList.module.scss";

interface FilterListProps extends React.ComponentPropsWithoutRef<"div"> {
    item: { heading: string; data: {}[] };
    animateRoute: void;
    removeRoute: void;
    currentRoute: string | null;
    setCurrentRoute: any;
}

const headingMap: any = {
    road: "Main Roads",
    education: "Schools and University",
    airports: "Airports",
    mall: "Malls",
};

const FilterList: React.FC<FilterListProps> = ({
    animateRoute,
    item,
    removeRoute,
    currentRoute,
    setCurrentRoute,
    className,
    ...otherProps
}) => {
    return (
        <div className={classNames(s.wrapper, className)} {...otherProps}>
            <h3 className={s.heading}>{headingMap[item.heading]}</h3>
            <ul className={s.list}>
                {item.data.map((item: any) => (
                    <li key={item.properties.id}>
                        <Checkbox
                            setCurrentRoute={setCurrentRoute}
                            active={currentRoute === item.properties.id}
                            removeRoute={removeRoute}
                            animateRoute={animateRoute}
                            item={item}
                        >
                            {item.properties.name}
                        </Checkbox>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterList;
