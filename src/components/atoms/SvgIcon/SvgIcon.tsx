import classNames from 'classnames';
import React from 'react';
import s from './SvgIcon.module.scss';

interface SvgIconProps extends React.ComponentPropsWithoutRef<'svg'> {
    icon:
        | 'menu-1'
        | 'arrow-up'
        | 'triangle_bold'
        | 'x'
        | 'interior'
        | '360'
        | 'augmented-reality'
        | 'layers'
        | 'plus-circle'
        | 'minus-circle';
}
const SvgIcon: React.FC<SvgIconProps> = ({
    icon,
    className,
    ...otherProps
}) => {
    return (
        <svg className={classNames(className, s.icon)} {...otherProps}>
            <use xlinkHref={'#' + icon}></use>
        </svg>
    );
};

export default SvgIcon;
