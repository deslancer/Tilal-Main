import classNames from 'classnames';
import React from 'react';
import s from './Menu.module.scss';

interface MenuProps extends React.ComponentPropsWithoutRef<'nav'> {
    items: {
        title: string;
        url: string;
    }[];
}
const Menu: React.FC<MenuProps> = ({ items, className, ...otherProps }) => {
    return (
        <nav className={classNames(className, s.navigation)} {...otherProps}>
            <ul className={s.navList}>
                {items.map((el, i) => (
                    <li className={s.navListItem} key={'item_' + i}>
                        <a className={s.navLink} href={el.url}>
                            {el.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
