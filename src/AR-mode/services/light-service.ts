import * as BABYLON from 'babylonjs';

export class LightService {
    private readonly scene;
    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
    }

    createHDRILight(){
        const hdrTexture =  BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/textures/envAR.env", this.scene);
        this.scene.environmentTexture = hdrTexture;
        hdrTexture.level = 1.0;

        hdrTexture.setReflectionTextureMatrix(BABYLON.Matrix.RotationY(3.20));
        return hdrTexture;
    }
}
