import { useRef } from "react";
import Container from "../../atoms/Container";
import MapFilter from "../../elements/MapFilter";
import sMain from "../../../styles/Main.module.scss";
import classNames from "classnames";
import ZoomButtons from "../../atoms/ZoomButtons";
import Compas from "../../atoms/Compas";
import useMapBox from "../../../hooks/useMapBox";

export default function Map() {
    const mapContainerRef = useRef(null);
    const { removeRoute, animateRoute } = useMapBox(mapContainerRef);

    return (
        <>
            <Container className={classNames(sMain.container__side, sMain.topContainer)}>
                <MapFilter removeRoute={removeRoute} animateRoute={animateRoute} />
            </Container>
            <ZoomButtons className={classNames(sMain.zoomButtons)} />
            <Compas className={classNames(sMain.compas)} />
            <div className={sMain.mapbox_container} ref={mapContainerRef} id="map"></div>
        </>
    );
}
