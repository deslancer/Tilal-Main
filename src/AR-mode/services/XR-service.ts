import * as BABYLON from 'babylonjs';
import { GUIService } from "./gui-service";

export class XRService {

	initWebXR( scene: BABYLON.Scene ) {
		return scene.createDefaultXRExperienceAsync( {
			disableDefaultUI: true,
			disableTeleportation: true,
			optionalFeatures: true,
		} ).then( ( xr ) => {
			const ghost: any = scene.getNodeByName("ghost");
			ghost.setEnabled(false)
			const featuresManager = xr.baseExperience.featuresManager;
			const xrTest = featuresManager.enableFeature( BABYLON.WebXRHitTest, 'latest' ) as BABYLON.WebXRHitTest;
			let hitTestResults;
			xrTest.onHitTestResultObservable.add( ( results ) => {
				if (results.length) {
					hitTestResults = results[0]
					ghost.setEnabled(true)
					hitTestResults.transformationMatrix.decompose(undefined, undefined, ghost.position);
				} else {

				}
			} );
			const gui_service = new GUIService( scene );
			const btn_exit = gui_service.addBtnExit(xr);
			const btn_place = gui_service.addBtnPlace(xrTest)

			const gui_message = gui_service.addMessage();
			let object: any = scene.getNodeByName( "Building" );

			xr.baseExperience.onStateChangedObservable.add( function ( state ) {
				switch (state) {
					case BABYLON.WebXRState.ENTERING_XR:
						object.setEnabled( false );
						ghost.getChildren('', false).forEach((child: any)=>{
							child.visibility = 0.35;
						})
						ghost.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI, BABYLON.Space.LOCAL)
						ghost.scalingDeterminant = 0.045;

						console.log( "entering xr" )
						break;
					case BABYLON.WebXRState.IN_XR:
						btn_exit.isVisible = true;
						btn_place.isVisible = true;
						gui_message.isVisible = true;
						console.log( "in xr" )
						break;
					case BABYLON.WebXRState.EXITING_XR:
						ghost.setEnabled( false );
						object.setEnabled( true );
						btn_exit.isVisible = false;
						btn_place.isVisible = false;
						gui_message.isVisible = false;
						console.log( "exiting xr" )
						break;
					case BABYLON.WebXRState.NOT_IN_XR:
						ghost.setEnabled( false );
						object.setEnabled( true );
						btn_exit.isVisible = false;
						btn_place.isVisible = false;
						gui_message.isVisible = false;
						console.log( "not in  xr" )
						break;
				}
			} );


			return xr
		} )
	}


	enterXRSession( scene: BABYLON.Scene ) {
		this.initWebXR( scene ).then( ( xr ) => {
			xr.baseExperience.enterXRAsync( "immersive-ar", "unbounded", xr.renderTarget );
		} )
	}

}
