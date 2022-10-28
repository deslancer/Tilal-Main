import * as BABYLON from 'babylonjs';

import { EngineService } from './services/engine-service';
import { CameraService } from './services/camera-service';
import { LightService } from './services/light-service';
import { LoaderService } from './services/loader-service';
import { GUIService } from "./services/gui-service";
import {useAppStore} from "../store/store";


export const createARScene = async ( canvas: HTMLCanvasElement ): Promise<BABYLON.Scene> => {
	useAppStore.setState({
		loading: true
	})
	const engine = new EngineService( canvas ).getEngine();
	const scene = new BABYLON.Scene( engine );
	scene.clearColor = new BABYLON.Color4( 0.37, 0.37, 0.37, 1.0 ).toLinearSpace();
	const camera = new CameraService( canvas, scene ).createPerspectiveCam();

	const lightService = new LightService( scene );
	const loaderService = new LoaderService();

	const guiService = new GUIService(scene);

	lightService.createHDRILight();
	loaderService.loadModel( scene );


	engine.runRenderLoop( () => {
		scene.render();
	} );
	const pipeline = new BABYLON.DefaultRenderingPipeline(
		"defaultPipeline", // The name of the pipeline
		true, // Do you want the pipeline to use HDR texture?
		scene, // The scene instance
		[camera] // The list of cameras to be attached to
	);
	pipeline.fxaaEnabled = true;
	pipeline.samples = 4;
	pipeline.imageProcessing.contrast = 1.5;

	return scene;
}
