import React from 'react';
import { useModal } from '../../../hooks/useModal';
import Button from '../../atoms/Button';
import Checkbox from '../../atoms/Checkbox';
import ConstantFormField from '../../atoms/ConstantFormField';
import InputLabel from '../../atoms/InputLabel';
import SvgIcon from '../../atoms/SvgIcon';
import TextInput from '../../atoms/TextInput';
import s from './RegisterIterestsForm.module.scss';

const RegisterInterestsForm: React.FC = () => {
    const { close } = useModal();
    return (
        <div className={s.wrapper}>
            <img
                className={s.topImage}
                src="/images/apartments-plans/Rectangle 17.jpg"
                alt=""
            />
            <div className={s.container}>
                <div className={s.heading}>
                    <h4 className={s.title}>Register Interest</h4>
                    <button onClick={close} className={s.closeButton}>
                        <SvgIcon className={s.closeButtonIcon} icon="x" />
                    </button>
                </div>
                <form className={s.form}>
                    <InputLabel text="Name">
                        <TextInput placeholder="Text" />
                    </InputLabel>
                    <InputLabel text="Phone Number">
                        <TextInput placeholder="Text" />
                    </InputLabel>
                    <InputLabel text="Email">
                        <TextInput placeholder="Text" />
                    </InputLabel>
                    <InputLabel text="ID Number">
                        <ConstantFormField>№205 (Zero Lot)</ConstantFormField>
                    </InputLabel>
                    <InputLabel text="Qualified">
                        <Checkbox className={s.checkbox}>Qualifield?</Checkbox>
                    </InputLabel>
                    <Button className={s.submitButton} mode="active">
                        Register My Interest
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RegisterInterestsForm;
