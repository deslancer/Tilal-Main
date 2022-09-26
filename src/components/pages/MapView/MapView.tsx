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

declare const mapboxgl: any;

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

    useEffect(()=>{
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3Z5c3R1bnAiLCJhIjoiY2tha3VrbXIxMDVnZzJ6bXZmdXZjN2ptayJ9.gtQcWk0OFvGTAwU8INr-hg'; //Ключ, который нужно будет заменить
        const map = new mapboxgl.Map({
            style: 'mapbox://styles/svystunp/cl42gcthv001315mp5kvv3j88', //Кастомный стиль карты с выделенными подписями улиц
            center: [46.6441086, 24.8956462], // Стартовая позиция [lng, lat]
            zoom: 14,
            container: 'map',
            antialias: true

        });
    })


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
            <div className={sMain.mapbox_container} id="map"></div>
        </Layout>
    );
};

export default MapView;
