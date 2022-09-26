import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '../SvgIcon';
import s from './NavigationBreadcrumbs.module.scss';

interface NavigationItem {
    title: string;
    url: string;
}

const navItems: NavigationItem[] = [
    {
        title: 'Khobar City',
        url: '/',
    },
    {
        title: 'Area',
        url: 'area',
    },
];
const NavigationBreadcrumbs: React.FC<React.ComponentPropsWithoutRef<'ul'>> = ({
    className,
    ...otherProps
}) => {
    return (
        <ul className={classNames(className, s.list)} {...otherProps}>
            {navItems.map((item, i) => (
                <li className={s.item} key={`item_${i}`}>
                    <SvgIcon className={s.triangle} icon="triangle_bold" />
                    <Link className={s.link} to={item.url}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavigationBreadcrumbs;
