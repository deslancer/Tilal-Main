import classNames from 'classnames';
import React, { useState } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import Button from '../../atoms/Button';
import FloorViewsSlider from '../../atoms/FloorViewsSlider';
import s from './HouseMap.module.scss';

interface FloorNavigationProps extends React.ComponentPropsWithoutRef<'ul'> {
    floors: Pick<HouseFloorOptions, 'floorTitle'>[];
    activeId?: number;
    setActive?: (floor: number) => unknown;
}
interface MarkedMapProps
    extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
    mapSrc: string;
    children?:
        | React.ReactElement<MapLocation>
        | React.ReactElement<MapLocation>[];
}
export interface MapLocation {
    x: number;
    y: number;
    pictureSrc: string;
    header: string;
}
export interface HouseFloorOptions {
    floorTitle: React.ReactNode;
    mapSrc: string;
    locations: MapLocation[];
}
interface HouseMapProps extends React.ComponentPropsWithoutRef<'div'> {
    floors: HouseFloorOptions[];
}

const MapLocationMarker: React.FC<
    Pick<MapLocation, 'x' | 'y'> & { active?: boolean }
> = ({ x, y, active }) => {
    return (
        <span
            style={{ left: x + '%', top: y + '%' }}
            className={classNames(s.mapMarker, active && s.mapMarker__active)}
        ></span>
    );
};

const FloorNavigation: React.FC<FloorNavigationProps> = ({
    floors,
    activeId,
    className,
    setActive,
    ...otherProps
}) => {
    return (
        <ul className={classNames(className, s.navigation)} {...otherProps}>
            {floors.map((floor, i) => (
                <li className={s.navigationItem} key={`nav_floor_${i}`}>
                    <Button
                        onClick={() => setActive && setActive(i)}
                        className={s.navigationButton}
                        mode={activeId === i ? 'active' : 'default'}
                    >
                        {floor.floorTitle}
                    </Button>
                </li>
            ))}
        </ul>
    );
};

const MarkeredMap: React.FC<MarkedMapProps> = ({
    mapSrc,
    className,
    children,
    ...otherProps
}) => {
    return (
        <div className={classNames(className, s.map)} {...otherProps}>
            {children}
            <img className={s.mapImage} src={mapSrc} alt="Home map" />
        </div>
    );
};
const HouseMap: React.FC<HouseMapProps> = ({
    floors,
    className,
    ...otherProps
}) => {
    const [floorId, setFloorId] = useState<number>(0);
    const floor = floors[floorId];
    const [locationId, setLocationId] = useState<number>(0);
    const { width } = useWindowSize();
    const { mapSrc, locations } = floor;

    return (
        <div className={classNames(className, s.wrapper)} {...otherProps}>
            <FloorNavigation
                setActive={setFloorId}
                floors={floors}
                activeId={floorId}
            />
            <div className={s.mapWrapper}>
                <MarkeredMap mapSrc={mapSrc}>
                    {locations.map((location, i) => (
                        <MapLocationMarker
                            {...location}
                            active={i === locationId}
                            key={`location_${locationId}_${i}`}
                        />
                    ))}
                </MarkeredMap>
            </div>
            {width >= 840 && (
                <FloorViewsSlider
                    onLocationPick={setLocationId}
                    className={s.slider}
                    items={floor.locations}
                    activeLocationId={locationId}
                />
            )}
        </div>
    );
};

export default HouseMap;
