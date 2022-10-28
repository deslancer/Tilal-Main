import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {useAppStore} from "../../store/store";

export class LoaderService {
    loadModel(scene: BABYLON.Scene) {

        let meshes;
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let filename = searchParams.get('file');
        const defaultFile = `type_a`;

        BABYLON.SceneLoader.ImportMeshAsync("", "./assets/models/", `${filename ? filename : defaultFile}.glb`, scene).then((result) => {
            meshes = result.meshes[0];
            const buildingNode: any = scene.getNodeByName('Building');
            const activeCamera: any = scene.activeCamera;
            activeCamera.setTarget(buildingNode.getAbsolutePosition())
            const buildingMaterial: any = scene.getMaterialByName('Building');
            const innerWallsMaterial: any = scene.getMaterialByName('Inner_Walls');
            const stairsMaterial: any = scene.getMaterialByName('Details');
            const detailsMaterial: any = scene.getMaterialByName('Tree');
            const windowGlass: any = scene.getMaterialByName('Window_Glass');

            buildingMaterial.unlit = true;
            innerWallsMaterial.unlit = true;
            stairsMaterial.unlit = true;
            detailsMaterial.unlit = true;
            windowGlass.metallic = 1.0;
            windowGlass.albedoColor = new BABYLON.Color3(0.58, 0.77 , 0.84);

            const ghostObject = meshes.clone("ghost", null, undefined);
            if (ghostObject){
                ghostObject.setEnabled(false);

                const building: any = ghostObject.getChildren(undefined, false);

                building.forEach((child: BABYLON.Mesh)=>{
                    child.visibility = 0.35;
                })
            }

            useAppStore.setState({
                loading: false
            })
        });

    }
}
