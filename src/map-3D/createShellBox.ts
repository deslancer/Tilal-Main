import * as BABYLON from "babylonjs";
import {useAppStore} from "../store/store";

export const createShellBox = (mesh: BABYLON.AbstractMesh) => {
    const scene = useAppStore.getState().scene;
    if(mesh){
        let childMeshes = mesh.subMeshes;
        let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
        let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
        let height, width, depth;
        for (let i = 0; i < childMeshes.length; i++) {
            let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
            let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
            min = BABYLON.Vector3.Minimize(min, meshMin);
            max = BABYLON.Vector3.Maximize(max, meshMax);
            height = max.y - min.y;
            width = (max.x - min.x) + 2;
            depth = (max.z - min.z) * 0.8;
        }
        if (height) {
            const shell_box = BABYLON.MeshBuilder.CreateBox("shell_box" + mesh.id, {
                height: height,
                width: width,
                depth: depth
            });
            shell_box.isPickable = false;
            shell_box.position.x = mesh.position.x;
            shell_box.position.y = height / 2;
            shell_box.position.z = mesh.position.z;
            const emissive_material = new BABYLON.StandardMaterial("shellMaterial" + mesh.id, scene);
            shell_box.material = emissive_material;
            emissive_material.alpha = 0.5;
            emissive_material.emissiveColor = BABYLON.Color3.FromHexString('#11B39B');
            emissive_material.diffuseColor = BABYLON.Color3.FromHexString('#11B39B');

        }
    }

}