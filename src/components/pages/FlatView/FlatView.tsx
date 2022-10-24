import React, {useCallback, useEffect, useRef, useState} from 'react';
import ApartmentsDetails from '../../atoms/ApartmentsDetails';
import Container from '../../atoms/Container';
import FloatingGallery from '../../atoms/FloatingGallery';
import NavigationBreadcrumbs from '../../atoms/NavigationBreadcrumbs';
import sMain from '../../../styles/Main.module.scss';
import s from './FlatView.module.scss';
import HouseMap from '../../elements/HouseMap';
import Layout from '../../elements/Layout';
import { RegistrationObject } from '../../atoms/Details/Details';
import classNames from 'classnames';
import ZoomButtons from '../../atoms/ZoomButtons';
import Compas from '../../atoms/Compas';
import Canvas from '../../atoms/Canvas';
import {createARScene} from "../../../AR-mode/scene";

const floatingGalleryOptions = {
    header: 'Plan',
    pictures: [
        {
            src: '/images/apartments-plans/plan1.jpg',
            alt: 'plan-A',
        },
        {
            src: '/images/apartments-plans/plan1.jpg',
            alt: 'plan-A',
        },
        {
            src: '/images/apartments-plans/plan1.jpg',
            alt: 'plan-A',
        },
    ],
};

const houseFloors = [
    {
        floorTitle: 'GF',
        mapSrc: '/images/apartments-plans/floor.jpg',
        locations: [
            {
                x: 50,
                y: 10,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 20,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 60,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
        ],
    },
    {
        floorTitle: '1',
        mapSrc: '/images/apartments-plans/floor.jpg',
        locations: [
            {
                x: 50,
                y: 10,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 20,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 60,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
        ],
    },
    {
        floorTitle: '2',
        mapSrc: '/images/apartments-plans/floor.jpg',
        locations: [
            {
                x: 50,
                y: 10,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 20,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 60,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
        ],
    },
    {
        floorTitle: 'RT',
        mapSrc: '/images/apartments-plans/floor.jpg',
        locations: [
            {
                x: 50,
                y: 10,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 20,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 60,
                y: 40,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
            {
                x: 30,
                y: 80,
                pictureSrc: '/images/apartments-plans/Rectangle 11.jpg',
                header: 'Guest Room',
            },
        ],
    },
];
const FlatView: React.FC = () => {
    const [showedElement, showedElementPlans] = useState<string | null>(null);
    const detailsControl = useRef<RegistrationObject | null>(null);
    const hidePlans = useCallback(() => {
        showedElementPlans(null);
    }, [showedElementPlans]);
    const setDetailsOpenState = useCallback((opened: boolean) => {
        detailsControl.current?.setOpened(opened);
    }, []);
    const handleAction = useCallback(
        (action: string) => {
            setDetailsOpenState(false);
            showedElementPlans(action);
        },
        [setDetailsOpenState, showedElementPlans]
    );
    const register = (registration: RegistrationObject) => {
        detailsControl.current = registration;
    };
    const shouldSetup = useRef(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        // Fix for React 18 strict mode, when useEffect called twice without cleanup function
        if (shouldSetup.current) {
            shouldSetup.current = false;
            const canvas = canvasRef.current;
            canvas && createARScene(canvas)
        }
    }, []);
    return (
        <Layout>
            <Container
                className={classNames(
                    sMain.topContainer,
                    s.pageMenuWrapper,
                    sMain.container__side
                )}
            >
                <NavigationBreadcrumbs />
                <ApartmentsDetails
                    onOpen={hidePlans}
                    register={register}
                    onButtonClick={handleAction}
                />
            </Container>
            {showedElement === 'plans' && (
                <Container className={s.planContainer}>
                    <FloatingGallery
                        className={s.floatingGallery}
                        onCloseButtonClick={hidePlans}
                        {...floatingGalleryOptions}
                    />
                </Container>
            )}
            {showedElement === '3d' && (
                <Container
                    className={classNames(
                        sMain.bottomContainer,
                        s.houseMapWrapper
                    )}
                >
                    <HouseMap floors={houseFloors} />
                </Container>
            )}
            <ZoomButtons className={classNames(sMain.zoomButtons)} />
            <Compas className={classNames(sMain.compas)} />
            <canvas
                ref={canvasRef}
                id="ar-canvas"
                className={s['canvas-ar']}
            ></canvas>
        </Layout>
    );
};

export default FlatView;

//MIT OCW
