import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import Container from '../../atoms/Container';
import Logo from '../../atoms/Logo';
import s from './LoadingScreen.module.scss';

interface LoadingScreenProps extends React.ComponentPropsWithoutRef<'div'> {
    progress: number | string;
}
interface ProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
    progress: number | string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    className,
    ...otherProps
}) => {
    return (
        <div
            className={classNames(className, s.progressWrapper)}
            {...otherProps}
        >
            <motion.div
                className={s.progress}
                initial={{ width: 0 }}
                animate={{ width: progress + '%' }}
            ></motion.div>
        </div>
    );
};
const LoadingScreen: React.FC<LoadingScreenProps> = ({
    progress,
    className,
    ...otherProps
}) => {
    return (
        <Container className={classNames(s.wrapper, className)} {...otherProps}>
            <Logo className={s.logo} direction="column" />
            <div className={s.loader}>
                <span className={s.loaderText}>Loading...</span>
               <ProgressBar className={s.progressLoader} progress={progress} />
            </div>
        </Container>
    );
};

export default LoadingScreen;
