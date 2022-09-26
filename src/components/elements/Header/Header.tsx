import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import Button from '../../atoms/Button';
import MenuButton from '../../atoms/Button/buttons/MenuButton';
import Logo from '../../atoms/Logo';
import Menu from '../Menu';
import s from './Header.module.scss';
import sButton from '../../../styles/Buttons.module.scss';

const items = [
    {
        title: 'Map',
        url: '/',
    },
    {
        title: 'Area',
        url: '/area',
    },
    {
        title: 'Flat',
        url: '/flat',
    },
];
const Header: React.FC = () => {
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const toogleMenu = useCallback(() => {
        setMenuOpened((opened) => !opened);
    }, [setMenuOpened]);
    const { width } = useWindowSize();
    return (
        <header
            className={classNames(s.header, menuOpened && s.header__opened)}
        >
            <Logo
                className={s.logo}
                colors={menuOpened && width < 840 ? 'colored' : 'monochrome'}
            />
            <div className={s.headerButtonsWrapper}>
                <div className={s.langButtons}>
                    <Button className={sButton.defaultButton} mode="active">
                        EN
                    </Button>
                    <Button className={sButton.defaultButton}>AR</Button>
                </div>

                <MenuButton opened={menuOpened} onClick={toogleMenu} />
            </div>
            {menuOpened && <Menu className={s.headerMenu} items={items} />}
        </header>
    );
};

export default Header;
