import React from 'react';
import { useModal } from '../../../hooks/useModal';
import Button from '../../atoms/Button';
import SvgIcon from '../../atoms/SvgIcon';
import s from './ConfirmationModal.module.scss';
import {useAppStore} from "../../../store/store";

const ConfirmationModal: React.FC = () => {
    const { close } = useModal();
    const {selectedHouseName, housesData} = useAppStore();
    const goToPage = ()=>{
        if (housesData){
            window.location.assign(`/flat?file=${selectedHouseName}`);
        }
    }
    const goBack = ()=>{
        close();
        useAppStore.setState({
            isHouseSelected: false
        })
    }
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                    <h4 className={s.title}>Show House Details?</h4>
                <div className={s.btns}>
                    <Button className={s.btn} onClick={goBack} mode="main">
                        Go Back
                    </Button>
                    <Button className={s.btn} onClick={goToPage} mode="active">
                        Show Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
