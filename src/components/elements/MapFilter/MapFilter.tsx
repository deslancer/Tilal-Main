import React, { useEffect, useMemo, useState } from "react";
import Details from "../../atoms/Details";
import FilterList from "../../atoms/FilterList";
import s from "./MapFilter.module.scss";

type FilterItems = {
    properties: { type: string };
}[];

const MapFilter = ({ removeRoute, animateRoute, ...props }: any) => {
    const [items, setItems] = useState<FilterItems>([]);
    const [currentRoute, setCurrentRoute] = React.useState<string | null>(null);

    useEffect(() => {
        async function fetchItems() {
            const response = await fetch("./routes.geojson");
            const data = await response.json();
            setItems(data.features);
        }
        fetchItems();
    }, []);

    const dataItems = useMemo(() => {
        return items.reduce((acc: any, item) => {
            const index = acc.findIndex(
                (el: { heading: string }) => el.heading === item.properties.type
            );

            if (index === -1) {
                return [...acc, { heading: item.properties.type, data: [item] }];
            }

            const newData = [...acc];
            newData[index].data.push(item);
            return newData;
        }, []);
    }, [items]);

    return (
        <Details {...props}>
            <span className={s.summary}>Map Routes</span>
            <ul className={s.list}>
                {dataItems.map((item: any) => (
                    <li key={item.heading}>
                        <FilterList
                            currentRoute={currentRoute}
                            setCurrentRoute={setCurrentRoute}
                            removeRoute={removeRoute}
                            animateRoute={animateRoute}
                            item={item}
                        />
                    </li>
                ))}
            </ul>
        </Details>
    );
};

export default MapFilter;
