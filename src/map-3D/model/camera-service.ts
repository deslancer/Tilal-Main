import * as BABYLON from 'babylonjs';

export class CameraService {
	private readonly canvas: HTMLCanvasElement;
	private readonly scene: any;
	camera: any;
	constructor( canvas: HTMLCanvasElement, scene: BABYLON.Scene ) {
		this.canvas = canvas;
		this.scene = scene;
	}

	createPerspectiveCam() {
		const camera = new BABYLON.ArcRotateCamera( "camera",
			3.683,
			1.078,
			354,
			new BABYLON.Vector3( 0, 0, 0 ),
			this.scene );
		camera.attachControl( this.canvas, true );
		camera.minZ = 10;
		camera.maxZ = 100000;
		camera.target = new BABYLON.Vector3( 0, 0.8, 0 );
		camera.upperBetaLimit = Math.PI / 2.2;
		camera.lowerRadiusLimit = 100;
		camera.upperRadiusLimit = 1000;

		this.camera = camera;
		return camera
	}
	getCamera(){
		return this.camera;
	}
}
