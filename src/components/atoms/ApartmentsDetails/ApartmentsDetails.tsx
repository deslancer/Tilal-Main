import React, { useCallback } from 'react';
import AvailabilityLabel from '../AvilabilityLabel';
import FormButton from '../Button/buttons/FormButton';
import Details from '../Details';
import { RegistrationObject } from '../Details/Details';
import SvgIcon from '../SvgIcon';
import s from './ApartmentsDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import useWindowSize from '../../../hooks/useWindowSize';
import {useAppStore} from "../../../store/store";
interface Size {
    value: React.ReactNode;
    description: React.ReactNode;
}
const sizes: Size[] = [
    {
        value: '100 х 230',
        description: 'Land Area',
    },
    {
        value: '100 х 230',
        description: 'Land Area',
    },
    {
        value: '100 х 230',
        description: 'Land Area',
    },
    {
        value: '100 х 230',
        description: 'Land Area',
    },
    {
        value: '100 х 230',
        description: 'Land Area',
    },
    {
        value: '100 х 230',
        description: 'Land Area',
    },
];
const ApartmentsDetails: React.FC<{
    onButtonClick?: (action: string) => unknown;
    open?: boolean;
    onOpen?: () => unknown;
    register?: (registration: RegistrationObject) => void;
}> = ({ onButtonClick, register, onOpen }) => {
    const handleButtonClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            const action = (event.target as HTMLElement).getAttribute(
                'data-action'
            );
            if (onButtonClick && action) {
                onButtonClick(action);
            }
        },
        [onButtonClick]
    );
    const navigate = useNavigate();
    const { open } = useModal();
    const { width } = useWindowSize();
    const { selectedHouse, housesData } = useAppStore();
    let houseData: any = {};
    housesData.map((obj: any)=> {
        if(selectedHouse == obj['LandNumber']){
            houseData = obj;
        }
    } )
    return (
        <Details onOpen={onOpen} register={register}>
            <div className={s.summary}>
                <span className={s.status}>{houseData['Unitfrontcompass']}</span>
                <span className={s.title}>№{selectedHouse} {houseData['Model'].substring(1,houseData['Model'].length)}</span>
            </div>
            <div className={s.details}>
                <div className={s.mainInfo}>
                    <AvailabilityLabel
                        className={s.statusLabel}
                        availability={houseData['Availability']}
                    >
                        Type {houseData['Model'].substring(0,1)}
                    </AvailabilityLabel>
                    <ul className={s.roomsList}>
                        <li>{houseData['NumberofBedrooms']} bedrooms</li>
                        <li>{houseData['NumberOfBathrooms']} bathrooms</li>
                    </ul>
                    <ul className={s.sizeInfoList}>
                            <li className={s.sizeInfoItem}>
                                <span className={s.sizeValue}>
                                   {houseData['Build-UPArea']}
                                </span>
                                <span className={s.sizeDescription}>
                                    Build-UP Area
                                </span>
                            </li>
                        <li className={s.sizeInfoItem}>
                                <span className={s.sizeValue}>
                                   {houseData['Guestroomsize']}
                                </span>
                            <span className={s.sizeDescription}>
                                    Guestroom size
                                </span>
                        </li>
                        <li className={s.sizeInfoItem}>
                                <span className={s.sizeValue}>
                                   {houseData['Kitchensize']}
                                </span>
                            <span className={s.sizeDescription}>
                                    Kitchen size
                                </span>
                        </li>
                        <li className={s.sizeInfoItem}>
                                <span className={s.sizeValue}>
                                   {houseData['LivingRoomsize']}
                                </span>
                            <span className={s.sizeDescription}>
                                    Living Room size
                                </span>
                        </li>
                        <li className={s.sizeInfoItem}>
                                <span className={s.sizeValue}>
                                   {houseData['MasterBedroomsize']}
                                </span>
                            <span className={s.sizeDescription}>
                                    Master Bedroom size
                                </span>
                        </li>
                    </ul>
                </div>
                <div onClick={handleButtonClick} className={s.buttons}>
                    <FormButton
                        data-action="3d"
                        mode="main"
                        className={s.button}
                    >
                        <SvgIcon className={s.button__icon} icon="interior" />
                        3D Exterior
                    </FormButton>
                    {width <= 850 && (
                        <FormButton
                            onClick={() => navigate('/flat/ar')}
                            mode="active"
                            className={s.button}
                        >
                            <SvgIcon
                                className={s.button__icon}
                                icon="augmented-reality"
                            />
                            Augmented reality
                        </FormButton>
                    )}
                    <FormButton mode="active" className={s.button}>
                        <a href="/vtour">
                            <SvgIcon className={s.button__icon} icon="360" />
                            <span>Virtual Tour</span>
                        </a>
                    </FormButton>
                    <FormButton
                        data-action="plans"
                        mode="active"
                        className={s.button}
                    >
                        <SvgIcon className={s.button__icon} icon="layers" />
                        Floor Plans
                    </FormButton>
                    <FormButton
                        onClick={() => open('registerInterset')}
                        mode="active"
                        className={s.button}
                    >
                        Register My Interest
                    </FormButton>
                </div>
            </div>
        </Details>
    );
};

export default ApartmentsDetails;
