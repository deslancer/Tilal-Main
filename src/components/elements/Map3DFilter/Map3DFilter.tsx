import React, { useEffect, useMemo, useState } from "react";
import Details from "../../atoms/Details";
import s from "./MapFilter.module.scss";
import Checkbox3D from "../../atoms/Checkbox3D";

type FilterItems = {
    heading: string;
    checkbox: string[];
}[];

const items: FilterItems = [
    {
        heading: 'Facing',
        checkbox: ['South'],
    },
    {
        heading: 'Availability',
        checkbox: ['Available']
    },
    {
        heading: 'Size of Plot',
        checkbox: ['up to 250sq/m'],
    },
    {
        heading: 'Number house',
        checkbox: ['Single'],
    },
    {
        heading: 'Other',
        checkbox: ['Close to mosque'],
    },
];
const Map3DFilter = ({ ...props }: any) => {

    return (
        <Details {...props}>
            <span className={s.summary}>Filter</span>
            <ul className={s.list}>
                {items.map((item) => (
                    <li key={item.heading}>
                        <h5 className={s.heading}>{item.heading}</h5>
                        <Checkbox3D children={item.checkbox}/>
                    </li>
                ))}
            </ul>
        </Details>
    );
};

export default Map3DFilter;
