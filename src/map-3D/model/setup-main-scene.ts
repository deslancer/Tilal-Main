import {ILoaderService} from "../interfaces/ILoaderService";
import {useAppStore} from "../../store/store";
import * as BABYLON from "babylonjs";
import getCSV from "../getDataFromCSV";
import {AbstractMesh} from "babylonjs/Meshes/abstractMesh";

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
        if (mainTask) {
            mainTask.onSuccess = (task) => {
                let meshes = task.loadedMeshes;

                meshes.forEach((mesh: BABYLON.Mesh) => {
                    mesh.freezeWorldMatrix();
                    mesh.doNotSyncBoundingInfo = true;
                    if (mesh.name.includes('Type_')) {
                        mesh.instances.map(m => m.actionManager = actionManager)
                    }

                })

                const ground = this.scene.getMeshByName('Road_Plane_1400m_Web');

                if (ground) {

                    const ground2KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_2K_Color.jpg', this.scene);
                    BABYLON.Texture.WhenAllReady([ground2KTexture], () => {
                        //@ts-ignore
                        ground.material.baseTexture = ground2KTexture;
                        //const ground4KTexture = new BABYLON.Texture('./assets/models/Road_Web_Cut_4K_Color.jpg', this.scene);
                        const opacityTexture = new BABYLON.Texture('./assets/models/Road_Cut_Web_with_opacity.png', this.scene);
                        BABYLON.Texture.WhenAllReady([opacityTexture], () => {
                            //@ts-ignore
                            ground.material.baseTexture = opacityTexture;
                            //@ts-ignore
                            ground.material.baseTexture.hasAlpha = true;
                            //@ts-ignore
                            ground.material.useAlphaFromBaseTexture = true;
                            //@ts-ignore
                            ground.material.alphaCutOff = 0.4;
                            //@ts-ignore
                            ground.material.transparencyMode = 2;

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
                actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, (ev) => {
                    if (ev.meshUnderPointer) {
                        const name = ev.meshUnderPointer.name
                        const sliced_name = name.substring(0, 6).toLowerCase();
                        const mesh_number = name.substring(7, name.length)
                        console.log(mesh_number)

                        if(name.includes("Type_")){
                            getCSV().then((res)=>{
                                useAppStore.setState({
                                    housesData: res,
                                })
                                useAppStore.setState({
                                    selectedHouse: mesh_number,
                                })
                                useAppStore.setState({
                                    selectedHouseName: sliced_name
                                })
                                useAppStore.setState({
                                    isHouseSelected: true
                                })
                            })

                        }
                    }


                }))

                actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
                    const meshUnder = ev.meshUnderPointer;

                    if (meshUnder) {
                        let childMeshes = meshUnder.subMeshes;
                        let min = childMeshes[0].getBoundingInfo().boundingBox.minimumWorld;
                        let max = childMeshes[0].getBoundingInfo().boundingBox.maximumWorld;
                        let height, width, depth;
                        for (let i = 0; i < childMeshes.length; i++) {
                            let meshMin = childMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
                            let meshMax = childMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
                            min = BABYLON.Vector3.Minimize(min, meshMin);
                            max = BABYLON.Vector3.Maximize(max, meshMax);
                            height = max.y - min.y;
                            width = max.x - min.x;
                            depth = (max.z - min.z) * 0.8;
                        }
                        if (height) {
                            const shell_box = BABYLON.MeshBuilder.CreateBox("shell_box" + meshUnder.id, {
                                height: height,
                                width: width,
                                depth: depth
                            });
                            shell_box.isPickable = false;
                            shell_box.position.x = meshUnder.position.x;
                            shell_box.position.y = height / 2;
                            shell_box.position.z = meshUnder.position.z;
                            const emissive_material = new BABYLON.StandardMaterial("shellMaterial" + meshUnder.id, this.scene);
                            shell_box.material = emissive_material;
                            emissive_material.alpha = 0.5;
                            emissive_material.emissiveColor = BABYLON.Color3.FromHexString('#11B39B');
                            emissive_material.diffuseColor = BABYLON.Color3.FromHexString('#11B39B');

                        }
                    }
                }));
                //if hover is over remove highlight of the mesh
                actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, (ev) => {
                    const meshUnder = ev.meshUnderPointer;
                    if (meshUnder) {
                        const shell = this.scene.getMeshByName("shell_box" + meshUnder.id);
                        const plane = this.scene.getMeshByName("btn_" + meshUnder.id);
                        const material = this.scene.getMaterialByName("shellMaterial" + meshUnder.id);
                        shell?.dispose();
                        plane?.dispose();
                        material?.dispose();
                    }
                }));
            }
        }

    }

}