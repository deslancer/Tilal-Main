import React from 'react';
import SvgIcon from '../../../SvgIcon';
import Button from '../../Button';
import s from './MenuButton.module.scss';
import sButtons from '../../../../../styles/Buttons.module.scss';
import classNames from 'classnames';
const MenuButton: React.FC<
    React.ComponentPropsWithoutRef<'button'> & { opened?: boolean }
> = ({ opened, ...props }) => {
    return (
        <Button
            className={classNames(s.button, sButtons.defaultButton)}
            {...props}
        >
            <SvgIcon icon={opened ? 'x' : 'menu-1'} className={s.icon} />
            Menu
        </Button>
    );
};

export default MenuButton;
