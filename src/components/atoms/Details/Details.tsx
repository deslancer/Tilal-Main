import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import SvgIcon from '../SvgIcon';
import s from './Details.module.scss';
import { motion } from 'framer-motion';

export interface RegistrationObject {
    setOpened: (opened: boolean) => unknown;
}
interface DetailsProps extends React.ComponentPropsWithoutRef<'details'> {
    children: [React.ReactNode, React.ReactNode];
    register?: (registered: RegistrationObject) => void;
    onOpen?: () => unknown;
}
const Details: React.FC<DetailsProps> = ({
    children,
    className,
    onClick,
    register,
    onOpen,
    ...otherProps
}) => {
    const [summary, details] = children;
    const [opened, setOpened] = useState<boolean>(false);

    const [stateOpen, setStateOpen] = useState<boolean>(false);
    const clickHandler = useCallback(
        (event: React.MouseEvent<HTMLDetailsElement>) => {
            event.preventDefault();
            setOpened((opened) => {
                if (!opened) setStateOpen(true);
                return !opened;
            });
            onClick && onClick(event);
        },
        [onClick, setOpened]
    );
    useEffect(() => {
        register &&
            register({ setOpened: (opened: boolean) => setOpened(opened) });
    }, [setOpened]);
    useEffect(() => {
        if (opened) onOpen && onOpen();
    }, [opened]);
    const handleAnimationEnd = useCallback(() => {
        if (!opened) setStateOpen(false);
    }, [opened, setStateOpen]);

    return (
        <details
            open={stateOpen}
            className={classNames(s.details, className)}
            {...otherProps}
        >
            <summary onClick={clickHandler} className={s.summary}>
                <div className={s.summary__content}>{summary}</div>
                <SvgIcon
                    className={classNames(s.icon, opened && s.icon__active)}
                    icon="arrow-up"
                />
            </summary>
            <motion.div
                animate={{
                    height: opened ? '100%' : '0px',
                    opacity: opened ? 1 : 0,
                }}
                style={{ overflow: 'hidden' }}
                onAnimationComplete={handleAnimationEnd}
            >
                <div className={s.details__content}>{details}</div>
            </motion.div>
        </details>
    );
};

export default Details;
