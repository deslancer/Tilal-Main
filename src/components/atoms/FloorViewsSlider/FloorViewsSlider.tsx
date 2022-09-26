import React, {
    LegacyRef,
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { MapLocation } from '../../elements/HouseMap/HouseMap';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import s from './FloorViewSlider.module.scss';
import classNames from 'classnames';

import '@splidejs/react-splide/css/core';
import useWindowSize from '../../../hooks/useWindowSize';

interface FloorViewSliderProps extends React.ComponentPropsWithoutRef<'div'> {
    items: Pick<MapLocation, 'header' | 'pictureSrc'>[];
    onLocationPick?: (locationId: number) => unknown;
    activeLocationId?: number;
}

const options = {
    perPage: 6,
    perMove: 1,
    arrows: false,
    pagination: false,
    opacity: [1, 1, 0.2, 0.2],
    breakpoints: {
        1024: {
            perPage: 4,
            perMove: 1,
            opacity: [0.5, 1, 1, 1, 0.5, 0.2, 0.2],
        },
        1440: {
            opacity: [],
        },
    },
};
const FloorViewsSlider: React.FC<FloorViewSliderProps> = ({
    items,
    className,
    onLocationPick,
    activeLocationId,
    ...otherProps
}) => {
    let opacity = options.opacity;
    const { width } = useWindowSize();
    const breakpoint = Object.keys(options.breakpoints)
        .filter((breakpoint) => +breakpoint < width)
        .pop();
    if (breakpoint) {
        opacity =
            options.breakpoints[+breakpoint as keyof typeof options.breakpoints]
                .opacity;
    }
    const sliderRef = useRef<any>(undefined);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const handleMove = useCallback(
        (_splide: any, index: number) => {
            setCurrentIndex(index);
        },
        [setCurrentIndex]
    );
    let opacityCounter = 0;
    const handleLocationPick = useCallback(
        (event: React.MouseEvent<HTMLInputElement>) => {
            const target = event.nativeEvent.target as any;
            target && onLocationPick && onLocationPick(+target.value);
        },
        []
    );
    return (
        <div
            onChange={handleLocationPick}
            className={classNames(className, s.wrapper)}
            {...otherProps}
        >
            <Splide onMove={handleMove} ref={sliderRef} options={options}>
                {items.map((item, i) => (
                    <SplideSlide key={'slide_' + i}>
                        <label
                            style={
                                {
                                    '--opacity':
                                        opacity.length &&
                                        i >= currentIndex &&
                                        opacityCounter < opacity.length
                                            ? opacity[opacityCounter++]
                                            : 1,
                                } as React.CSSProperties
                            }
                            className={classNames(
                                s.item,
                                i === activeLocationId && s.item__active
                            )}
                        >
                            <img
                                className={s.image}
                                src={item.pictureSrc}
                                alt={item.header}
                            />
                            <input
                                style={{ display: 'none' }}
                                type="radio"
                                value={i}
                                name="location"
                            />
                            <h4 className={s.header}>{item.header}</h4>
                        </label>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default FloorViewsSlider;
