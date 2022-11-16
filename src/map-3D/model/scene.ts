import * as BABYLON from 'babylonjs';
import {LoaderService} from "./loader-service";
import {EngineService} from "./engine-service";
import {CameraService} from "./camera-service";
import {EnvironmentService} from "./environment-service";
import {MaterialsService} from "./materials-service";
import {SetupMainScene} from "./setup-main-scene";
import {useAppStore} from "../../store/store";
import getCSV from "../getDataFromCSV";

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
        useAppStore.setState({
            scene: scene
        })
        getCSV().then((res)=>{
            useAppStore.setState({
                housesData: res,
            })
        })
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