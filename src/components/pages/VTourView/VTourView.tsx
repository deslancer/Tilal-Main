import React, {useEffect} from "react";
import Layout from "../../elements/Layout";

declare let embedpano: any;

const VTourView: React.FC = () => {
    useEffect(()=>{
        embedpano({swf:"3dtour.swf", xml:"3dtour.xml", target:"pano", html5:"prefer", mobilescale:1.0, passQueryParameters:true});

    })
    return (
        <Layout>
            <div id="pano"></div>
        </Layout>
    );
}
export default VTourView;