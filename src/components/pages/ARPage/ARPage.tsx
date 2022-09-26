import React from 'react';
import Button from '../../atoms/Button';
import Canvas from '../../atoms/Canvas';
import Container from '../../atoms/Container';
import SvgIcon from '../../atoms/SvgIcon';
import s from './ARpage.module.scss';

const ARPage: React.FC = () => {
    return (
        <Container className={s.container}>
            <div className={s.top}>
                <Button mode="active" className={s.closeButton}>
                    <SvgIcon className={s.closeButtonIcon} icon="x" />
                </Button>
            </div>
            <div className={s.bottom}>
                <p className={s.instructions}>
                    Find a free area and slowly move the phone until a ghost
                    object appears. Than tap the Place button
                </p>
                <Button className={s.actionButton} mode="active">
                    Place House Here
                </Button>
            </div>
            <Canvas />
        </Container>
    );
};

export default ARPage;
