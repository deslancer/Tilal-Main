import React, { useCallback, useContext, useState } from 'react';
import { modals } from '../helpres/modals';

interface IModalContext {
    open: (
        type: modals,
        options?: {
            opener?: React.Ref<HTMLElement> | undefined;
            initialProps: unknown;
        }
    ) => void;
    close: () => void;
    setModalProps: (props: unknown) => unknown;
    isOpened: boolean;
    modalType: modals | null;
    opener: React.Ref<HTMLElement> | null;
    props: any;
}
const ModalContext = React.createContext<IModalContext | null>(null);
export const ModalProvider: React.FC<{ children: JSX.Element }> = function ({
    children,
}) {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [modalType, setModalType] = useState<modals | null>(null);
    const [opener, setOpener] = useState<React.Ref<HTMLElement>>(null);
    const [props, setProps] = useState<unknown>({});
    const open: IModalContext['open'] = useCallback(
        function (type, options) {
            setIsOpened(true);
            setModalType(type);
            setOpener((opener: React.Ref<HTMLElement> | null) =>
                opener ? opener : null
            );
            setProps(options?.initialProps ?? {});
        },
        [setIsOpened, setModalType, setOpener, setProps]
    );
    const close = useCallback(
        function () {
            setIsOpened(false);
            setModalType(null);
            setOpener(null);
        },
        [setIsOpened, setModalType, setOpener]
    );
    return (
        <ModalContext.Provider
            value={{
                open,
                close,
                setModalProps: setProps,
                isOpened,
                modalType,
                opener,
                props,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
export function useModal() {
    return useContext(ModalContext) as IModalContext;
}
