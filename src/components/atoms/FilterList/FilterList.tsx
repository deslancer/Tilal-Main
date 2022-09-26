import classNames from 'classnames';
import React from 'react';
import Checkbox from '../Checkbox';
import s from './FilterList.module.scss';

interface FilterListProps extends React.ComponentPropsWithoutRef<'div'> {
    heading?: React.ReactNode;
    items: string[];
}
const FilterList: React.FC<FilterListProps> = ({
    heading,
    items,
    className,
    ...otherProps
}) => {
    return (
        <div className={classNames(s.wrapper, className)} {...otherProps}>
            <h3 className={s.heading}>{heading}</h3>
            <ul className={s.list}>
                {items.map((item) => (
                    <li key={item}>
                        <Checkbox>{item}</Checkbox>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterList;
