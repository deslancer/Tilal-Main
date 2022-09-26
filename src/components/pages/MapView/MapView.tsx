import React, { useEffect } from 'react';
import { useModal } from '../../../hooks/useModal';
import useTimeout from '../../../hooks/useTimeout';
import Container from '../../atoms/Container';
import Layout from '../../elements/Layout';
import MapFilter from '../../elements/MapFilter';
import sMain from '../../../styles/Main.module.scss';
import classNames from 'classnames';
import ZoomButtons from '../../atoms/ZoomButtons';
import Compas from '../../atoms/Compas';
import Canvas from '../../atoms/Canvas';

const MapView: React.FC = () => {
    const { open, close, setModalProps } = useModal();
    useEffect(() => {
        open('loading', { initialProps: { progress: 0 } });
    }, [open]);
    useTimeout(() => {
        setModalProps({ progress: 100 });
    }, 1000);
    useTimeout(() => {
        close();
    }, 1400);
    return (
        <Layout>
            <Container
                className={classNames(
                    sMain.container__side,
                    sMain.topContainer
                )}
            >
                <MapFilter />
            </Container>
            <ZoomButtons className={classNames(sMain.zoomButtons)} />
            <Compas className={classNames(sMain.compas)} />
            <Canvas />
        </Layout>
    );
};

export default MapView;
