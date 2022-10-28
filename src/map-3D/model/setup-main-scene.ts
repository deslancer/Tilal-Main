import {ILoaderService} from "../interfaces/ILoaderService";
import {useAppStore} from "../../store/store";

export class SetupMainScene {
    private loaderService: ILoaderService;
    private readonly scene: BABYLON.Scene;

    constructor(loaderService: ILoaderService, scene: any) {
        this.loaderService = loaderService;
        this.scene = scene;
    }

    setupMeshes() {
        const mainTask = this.loaderService.getMainSceneTask()
        let actionManager = new BABYLON.ActionManager(this.scene);
        if (mainTask){
            mainTask.onSuccess = (task) => {
                let meshes = task.loadedMeshes;

                meshes.forEach((mesh: BABYLON.Mesh) => {
                    mesh.freezeWorldMatrix();
                    mesh.doNotSyncBoundingInfo = true;
                    if(mesh.name.includes('Type_')){
                        mesh.instances.map(m => m.actionManager = actionManager)
                    }

                })

                const ground = this.scene.getMeshByName('Road_Plane_1400m_Web');
                if(ground){

                    const ground2KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_2K_Color.jpg', this.scene);
                    BABYLON.Texture.WhenAllReady([ground2KTexture], () => {
                        //@ts-ignore
                        ground.material.baseTexture = ground2KTexture;
                        const ground4KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_4K_Color.jpg', this.scene);
                        const opacityTexture = new BABYLON.Texture('./assets/models/Road_Cut_Web_8K_Opacity.jpg', this.scene);
                        BABYLON.Texture.WhenAllReady([ground4KTexture], () => {
                            //@ts-ignore
                            ground.material.baseTexture = ground4KTexture;
                            //@ts-ignore
                            ground.material.opacityTexture = opacityTexture;

                            useAppStore.setState({
                                loading: false
                            })
                          /*  const ground8KTexture = new BABYLON.Texture('./assets/models/Road_Cut_Web_8K_Color.jpg', this.scene);
                            BABYLON.Texture.WhenAllReady([ground8KTexture], () => {
                                //@ts-ignore
                                ground.material.baseTexture = ground8KTexture;
                                ground.material?.freeze();
                                console.log("8k ground texture loaded successfully")
                                ground2KTexture.dispose();
                                ground4KTexture.dispose();
                            })*/
                        })
                    })


                }

                actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
                    const meshUnder = ev.meshUnderPointer;
                    if (meshUnder) {
                        meshUnder.scaling.x = 1.1;
                        meshUnder.scaling.y = 1.1;
                        meshUnder.scaling.z = 1.1;
                    }
                }));
                //if hover is over remove highlight of the mesh
                actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
                    const meshUnder = ev.meshUnderPointer;
                    if (meshUnder) {
                        meshUnder.scaling.x = 1;
                        meshUnder.scaling.y = 1;
                        meshUnder.scaling.z = 1;
                    }
                }));
            }
        }

    }

}