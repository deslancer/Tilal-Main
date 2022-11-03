import * as BABYLON from 'babylonjs';
import {LoaderService} from "./loader-service";
import {EngineService} from "./engine-service";
import {CameraService} from "./camera-service";
import {EnvironmentService} from "./environment-service";
import {MaterialsService} from "./materials-service";
import {SetupMainScene} from "./setup-main-scene";
import {useAppStore} from "../../store/store";

export const createScene = async (canvas: HTMLCanvasElement): Promise<BABYLON.Scene> => {
    useAppStore.setState({
        loading: true
    })
    const engine = new EngineService(canvas).getEngine();
    const scene = new BABYLON.Scene(engine);
    const cameraService = new CameraService(canvas, scene);
    const loaderService = new LoaderService(scene);
    const materialService = new MaterialsService(scene);
    const envService = new EnvironmentService(scene, materialService, loaderService);
    const setupMainScene = new SetupMainScene(loaderService, scene);

    scene.clearColor = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0).toLinearSpace();
    const camera = cameraService.createPerspectiveCam();

    loaderService.loadAll();
    materialService.createBackgroundMaterial();
    materialService.createDynamicSky();
    envService.createSkyBox();
    envService.createHDREnvironment();

    setupMainScene.setupMeshes();
    const mb = new BABYLON.MotionBlurPostProcess('mb', scene, 1.0, camera);
    mb.motionStrength = 0.15;
    mb.isObjectBased = true;
    //////Optimization
    scene.cleanCachedTextureBuffer();

    const defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
    defaultPipeline.imageProcessing.contrast = 1.7;
    defaultPipeline.imageProcessing.exposure = 1.2;
    defaultPipeline.imageProcessing.vignetteEnabled = true;
    defaultPipeline.imageProcessing.vignetteColor = new BABYLON.Color4(1, 1, 1, 0.5);
    defaultPipeline.imageProcessing.vignetteWeight = 1.5;
    defaultPipeline.imageProcessing.vignetteCameraFov = 0.18;
    // @ts-ignore
    defaultPipeline.imageProcessing.vignetteBlendMode = BABYLON.ImageProcessingPostProcess.VIGNETTEMODE_OPAQUE;
    defaultPipeline.imageProcessing.toneMappingEnabled = true;
    // @ts-ignore
    defaultPipeline.imageProcessing.toneMappingType = BABYLON.ImageProcessingPostProcess.TONEMAPPING_ACES;






    scene.onPointerDown = () =>{
        const pickResult = scene.pick(scene.pointerX, scene.pointerY);

        if (pickResult && pickResult.hit) {
            //@ts-ignore
            const name = pickResult.pickedMesh.name

            const sliced_name = name.substring(0, 6).toLowerCase();
            const mesh_number = name.substring(7, name.length)
            console.log(mesh_number)
           // getCSV()
            //@ts-ignore
           if(pickResult.pickedMesh.name.includes("Type_")){
                window.location.assign(`/flat?file=${sliced_name}`);
            }

        }
    }
    async function getCSV() {
        let response = await fetch('https://docs.google.com/spreadsheets/d/1lRRrRoQCW-GSfn2Vwdy95X5goTGT97NM/export?format=csv');

        if (response.ok) {
            let readableStream = await response.body;
            if (readableStream){
                const reader = readableStream.getReader();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('Поток завершен.');
                        break;
                    }
                    const string = new TextDecoder().decode(value);
                    console.log(string)
                   console.log(csvJSON(string))
                }
            }

        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    function csvJSON(csv: string) {
        const lines = csv.split('\n')
        const result = []
        const headers = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i])
                continue
            const obj: any = {}
            const currentline = lines[i].split(',')

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }
            result.push(obj)
        }
        return result
    }
    document.onkeyup = function (e) {
        const evt = window.event || e;
        //console.log(evt.keyCode);
        // @ts-ignore
        if (evt.keyCode === 73 && evt.ctrlKey && evt.altKey) {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show({
                    globalRoot: document.body,
                    overlay: true,
                });
            }
        }
    };
    loaderService.assetsManager.onFinish = function(tasks) {
        engine.runRenderLoop(function() {
            scene.render();
        });
    };
    loaderService.assetsManager.onProgress = function(remainingCount, totalCount, lastFinishedTask) {
        const percent = Math.abs((remainingCount - totalCount / totalCount ) * 100)
        useAppStore.setState({
            progress: percent
        })
    };
    window.addEventListener('resize', () => {
        engine.resize();
    });
    return scene;
}