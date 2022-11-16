import React from "react";
import Details from "../../atoms/Details";
import s from "./MapFilter.module.scss";
import Checkbox3D from "../../atoms/Checkbox3D";

type FilterItems = {
    heading: string;
    key: string;
    checkbox: string[];
}[];

const items: FilterItems = [
    {
        heading: 'Facing',
        key: 'Unitfrontcompass',
        checkbox: ['South', 'North', 'East', 'West'],
    },
    {
        heading: 'Availability',
        key: 'Availability',
        checkbox: ['Available', 'Reserved', 'Not Available']
    },
    {
        heading: 'Size of Plot',
        key: 'LandArea',
        checkbox: ['Up to 250sq/m', 'Over 250sq/m'],
    },
    {
        heading: 'Number house',
        key: 'Model',
        checkbox: ['Single', 'Duplex'],
    },
    {
        heading: 'Other',
        key: '',
        checkbox: ['Close to facilities', 'Close to mosque', 'Corner villas'],
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
                        {item.checkbox.map((chk, idx)=>(
                            <Checkbox3D value={chk} property={item.key} key={idx}/>
                        ))}

                    </li>
                ))}
            </ul>
        </Details>
    );
};

export default Map3DFilter;
