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
        let data;
        map.on('load', async () => {
            //Загрузка иконки городка и добавление координат
            map.loadImage(
                'images/house.png',
                (error: Error, image: any) => {
                    if (error) throw error;
                    map.addImage('custom-marker', image);
                });

            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    46.6441086, 24.8956462
                                ]
                            },
                            'properties': {
                                'title': 'Tilal Homes in Narjis'
                            }
                        }
                    ]
                }
            });


            const response = await fetch(
                'map_geojson/routes.geojson'
            );
            data = await response.json();
            //Добавление точки городка
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'custom-marker',
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            });

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
