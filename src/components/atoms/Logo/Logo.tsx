import React from 'react';
import s from './Logo.module.scss';
import logos from '../../../assets/svg/Logos.svg';
import columnLogos from '../../../assets/svg/Logos-verical.svg';
import coloredLogos from '../../../assets/svg/Logos-colored.svg';
import classNames from 'classnames';

interface LogoProps extends React.ComponentPropsWithoutRef<'div'> {
    direction?: 'row' | 'column';
    colors?: 'monochrome' | 'colored';
}
const Logo: React.FC<LogoProps> = ({
    className,
    direction = 'row',
    colors = 'monochrome',
    ...otherProps
}) => {
    return (
        <div className={classNames(className, s.logo)} {...otherProps}>
            <img
                src={
                    direction === 'row'
                        ? colors === 'monochrome'
                            ? logos
                            : coloredLogos
                        : columnLogos
                }
                alt="logo"
            />
        </div>
    );
};

export default Logo;
