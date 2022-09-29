import {ILoaderService} from "../interfaces/ILoaderService";

export class SetupMainScene {
    private loaderService: ILoaderService;
    private readonly scene: BABYLON.Scene;

    constructor(loaderService: ILoaderService, scene: any) {
        this.loaderService = loaderService;
        this.scene = scene;
    }

    setGroundTexture() {
        const mainTask = this.loaderService.getMainSceneTask()
        if (mainTask){
            mainTask.onSuccess = (task) => {
                let meshes = task.loadedMeshes;
                meshes.forEach((mesh: BABYLON.Mesh) => {
                    mesh.freezeWorldMatrix();
                    mesh.doNotSyncBoundingInfo = true;
                    mesh.isPickable = false;

                })
                const ground = this.scene.getMeshByName('Road_Plane_1400m_Web');
                if(ground){
                    const ground2KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_2K_Color.jpg', this.scene);
                    const ground4KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_4K_Color.jpg', this.scene);
                    BABYLON.Texture.WhenAllReady([ground2KTexture], () => {
                        //@ts-ignore
                        ground.material.baseTexture = ground2KTexture;

                    })
                    BABYLON.Texture.WhenAllReady([ground4KTexture], () => {
                        //@ts-ignore
                        ground.material.baseTexture = ground4KTexture;
                        ground.material?.freeze();
                    })
                }


            }
        }

    }
}