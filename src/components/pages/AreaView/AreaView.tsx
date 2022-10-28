import React, {useEffect, useRef} from 'react';
import Container from '../../atoms/Container';
import NavigationBreadcrumbs from '../../atoms/NavigationBreadcrumbs';
import TypesMenu from '../../atoms/TypesMenu';
import Map3DFilter from '../../elements/Map3DFilter';
import sMain from '../../../styles/Main.module.scss';
import Layout from '../../elements/Layout';
import classNames from 'classnames';
import s from './AreaView.module.scss';
import ZoomButtons from '../../atoms/ZoomButtons';
import Compas from '../../atoms/Compas';
import {createScene} from "../../../map-3D/model/scene";
import {useModal} from "../../../hooks/useModal";
import {useAppStore} from "../../../store/store";


const AreaView: React.FC = () => {
    const shouldSetup = useRef(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { loading } = useAppStore();
    const { open, close, setModalProps } = useModal();
    useEffect(()=>{
        if (loading){
            open("loading", { initialProps: { progress: 0 } });
        }else {
            setModalProps({ progress: 100 });
            close();
        }
    },[loading])

    useEffect(() => {
        // Fix for React 18 strict mode, when useEffect called twice without cleanup function
        if (shouldSetup.current) {
            shouldSetup.current = false;
            const canvas = canvasRef.current;
            canvas && createScene(canvas)
        }
    }, []);
    return (
        <Layout>
            <Container
                className={classNames(
                    sMain.topContainer,
                    sMain.container__side,
                    sMain.topContainer__fullHeight,
                    s.wrapper
                )}
            >
                <NavigationBreadcrumbs className={s.breadcrumbs} />
                <Map3DFilter className={s.filter} />
                <TypesMenu className={s.typesMenu} />
            </Container>
            <ZoomButtons className={classNames(sMain.zoomButtons)} />
            <Compas className={classNames(sMain.compas)} />
            <canvas
                ref={canvasRef}
                id="lg-canvas"
                className={s['canvas-3D']}
            ></canvas>
        </Layout>
    );
};

export default AreaView;
