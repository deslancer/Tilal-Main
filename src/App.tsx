import React, { useEffect } from 'react';
import LockScroll from './components/atoms/LockScroll';
import ModalWindow from './components/atoms/ModalWindow';
import SvgSprite from './components/atoms/SvgSprite';
import Layout from './components/elements/Layout';
import AreaView from './components/pages/AreaView';
import ARPage from './components/pages/ARPage';
import FlatView from './components/pages/FlatView';
import MapView from './components/pages/MapView';
import { useModal } from './hooks/useModal';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
} from 'react-router-dom';

function App() {
    const { isOpened, modalType, open } = useModal();
    // useEffect(() => {
    //     open('registerInterset');
    // }, []);

    return (
        <>
            {isOpened && modalType && <ModalWindow type={modalType} />}
            <LockScroll lock={isOpened}>
                <Router>
                    <Routes>
                        <Route element={<MapView />} path="/" />
                        <Route element={<AreaView />} path="/area" />
                        <Route element={<FlatView />} path="/flat" />
                        <Route element={<ARPage />} path="/flat/ar" />
                    </Routes>
                </Router>
                <SvgSprite />
            </LockScroll>
        </>
    );
}

export default App;
