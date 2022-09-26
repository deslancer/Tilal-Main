import classNames from 'classnames';
import React from 'react';
import SvgIcon from '../SvgIcon';
import s from './FloatingGallery.module.scss';

export interface Photo {
    src: string;
    alt?: string;
}
interface FloatingGalleryProps extends React.ComponentPropsWithoutRef<'div'> {
    header?: React.ReactNode;
    pictures: Photo[];
    onCloseButtonClick?: () => unknown;
}
const FloatingGallery: React.FC<FloatingGalleryProps> = ({
    className,
    header,
    pictures,
    onCloseButtonClick,
    ...otherProps
}) => {
    return (
        <div className={classNames(className, s.wrapper)} {...otherProps}>
            <div className={s.information}>
                {header && <h3 className={s.heading}>{header}</h3>}
                <button onClick={onCloseButtonClick} className={s.closeButton}>
                    <SvgIcon className={s.closeIcon} icon="x" />
                </button>
            </div>
            <ul className={s.galleryList}>
                {pictures.map(({ src, alt = '' }, i) => (
                    <li
                        className={s.galleryListItem}
                        key={`picture_${alt}_${i}`}
                    >
                        <img
                            className={s.galleryListImage}
                            src={src}
                            alt={alt}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FloatingGallery;
