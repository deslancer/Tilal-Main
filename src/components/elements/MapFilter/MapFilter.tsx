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
        heading: 'Main Roads',
        items: ['King Salman Bin Abdulaziz Rd'],
    },
    {
        heading: 'Schools and University',
        items: ['Princess Nourah Bint Abdul Rahman University', 'American International School- AISR'],
    },
    {
        heading: 'Malls',
        items: ['Mall Of Saudi Brought to you by Majid Al Futtaim', 'Avenues Mall'],
    },
    {
        heading: 'Airports',
        items: ['King Khalid International Airport'],
    },
];
const MapFilter: React.FC<React.ComponentPropsWithoutRef<'details'>> = (
    props
) => {
    return (
        <Details {...props}>
            <span className={s.summary}>Map Routes</span>
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
