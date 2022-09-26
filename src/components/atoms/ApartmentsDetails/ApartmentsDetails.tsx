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
    return (
        <Details onOpen={onOpen} register={register}>
            <div className={s.summary}>
                <span className={s.status}>East</span>
                <span className={s.title}>№205 (Zero Lot)</span>
            </div>
            <div className={s.details}>
                <div className={s.mainInfo}>
                    <AvailabilityLabel
                        className={s.statusLabel}
                        availability="available"
                    >
                        Type B
                    </AvailabilityLabel>
                    <ul className={s.roomsList}>
                        <li>3 bedrooms</li>
                        <li>6 bathrooms</li>
                    </ul>
                    <ul className={s.sizeInfoList}>
                        {sizes.map((size, i) => (
                            <li className={s.sizeInfoItem} key={`item_${i}`}>
                                <span className={s.sizeValue}>
                                    {size.value}
                                </span>
                                <span className={s.sizeDescription}>
                                    {size.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div onClick={handleButtonClick} className={s.buttons}>
                    <FormButton
                        data-action="3d"
                        mode="active"
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
                        <SvgIcon className={s.button__icon} icon="360" />
                        Virtual Tour
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
                        mode="main"
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
