import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import TypeButton from '../Button/buttons/TypeButton';
import s from './TypesMenu.module.scss';

const types: string[] = ['A', 'B', 'C'];
const TypesMenu: React.FC<React.ComponentPropsWithRef<'div'>> = ({
    className,
    ...otherProps
}) => {
    const [activeId, setActiveId] = useState<number | null>(null);
    const handleButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            const target = event.currentTarget;
            const value = target.getAttribute('data-id');
            if (value) {
                setActiveId(+value);
            }
        },
        [setActiveId]
    );
    return (
        <div className={classNames(s.menu, className)} {...otherProps}>
            <span className={s.title}>Types</span>
            <ul className={s.list}>
                {types.map((type, i) => (
                    <li className={s.item} key={`type_${type}`}>
                        <TypeButton
                            onClick={handleButtonClick}
                            data-id={i}
                            active={i === activeId}
                            className={s.button}
                        >
                            {type}
                        </TypeButton>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TypesMenu;
