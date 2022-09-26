import React from 'react';
import Container from '../../atoms/Container';
import NavigationBreadcrumbs from '../../atoms/NavigationBreadcrumbs';
import TypesMenu from '../../atoms/TypesMenu';
import MapFilter from '../../elements/MapFilter';
import sMain from '../../../styles/Main.module.scss';
import Layout from '../../elements/Layout';
import classNames from 'classnames';
import s from './AreaView.module.scss';
import ZoomButtons from '../../atoms/ZoomButtons';
import Compas from '../../atoms/Compas';
import Canvas from '../../atoms/Canvas';

const AreaView: React.FC = () => {
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
                <MapFilter className={s.filter} />
                <TypesMenu className={s.typesMenu} />
            </Container>
            <ZoomButtons className={classNames(sMain.zoomButtons)} />
            <Compas className={classNames(sMain.compas)} />
            <Canvas />
        </Layout>
    );
};

export default AreaView;
