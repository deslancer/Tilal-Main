import React from 'react';
import Details from '../../atoms/Details';
import FilterList from '../../atoms/FilterList';
import s from './MapFilter.module.scss';

type FilterItems = {
    heading: string;
    items: string[];
}[];

const items: FilterItems = [
    {
        heading: 'Facing',
        items: ['South', 'South-1', 'South-2', 'South-3'],
    },
    {
        heading: 'Availability',
        items: ['South', 'South-1', 'South-2'],
    },
    {
        heading: 'Size of plot',
        items: ['South', 'South-1'],
    },
    {
        heading: 'Number house',
        items: ['South', 'South-1'],
    },
    {
        heading: 'Other',
        items: ['South', 'South-1', 'South-2'],
    },
];
const MapFilter: React.FC<React.ComponentPropsWithoutRef<'details'>> = (
    props
) => {
    return (
        <Details {...props}>
            <span className={s.summary}>Map Filter</span>
            <ul className={s.list}>
                {items.map((item) => (
                    <li key={item.heading}>
                        <FilterList heading={item.heading} items={item.items} />
                    </li>
                ))}
            </ul>
        </Details>
    );
};

export default MapFilter;
