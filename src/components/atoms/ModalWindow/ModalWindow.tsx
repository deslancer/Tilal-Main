import React from 'react';
import modalWindows, { modals } from '../../../helpres/modals';
import { useModal } from '../../../hooks/useModal';
import ModalWrapper from '../ModalWrapper';

const ModalWindow: React.FC<{ type: modals }> = function ({ type }) {
    const Modal = modalWindows[type];
    const { props } = useModal();
    return (
        <ModalWrapper>
            <Modal {...props} />
        </ModalWrapper>
    );
};

export default ModalWindow;
