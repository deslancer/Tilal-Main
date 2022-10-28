import React, {useEffect} from "react";
import Layout from "../../elements/Layout";
import s from './VTourView.module.scss';

declare let embedpano: any;

const VTourView: React.FC = () => {
    useEffect(()=>{
        embedpano({swf:"./vrtour/3dtour.swf", xml:"./vrtour/3dtour.xml", target:"pano", html5:"prefer", mobilescale:1.0, passQueryParameters:true});
    })
    return (
        <Layout>
            <div className={s.panoContainer} id="pano"></div>
        </Layout>
    );
}
export default VTourView;