import React, { useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import useTimeout from "../../../hooks/useTimeout";
import Layout from "../../elements/Layout";

import Map from "../../elements/Map/Map";

const MapView: React.FC = () => {
    const { open, close, setModalProps } = useModal();
    useEffect(() => {
        open("loading", { initialProps: { progress: 0 } });
    }, [open]);
    useTimeout(() => {
        setModalProps({ progress: 100 });
    }, 1000);
    useTimeout(() => {
        close();
    }, 1400);

    return (
        <Layout>
            <Map />
        </Layout>
    );
};

export default MapView;
