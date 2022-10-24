import * as BABYLON from 'babylonjs';
import {DeviceIdentifierHelper} from "./device-identifier-helper";

export class EngineService{
    private readonly engine: BABYLON.Engine;
    private deviceIdentifier = new DeviceIdentifierHelper();
    constructor(canvas: HTMLCanvasElement){
        this.engine = new BABYLON.Engine(canvas,
            (this.deviceIdentifier.checkIOSVersion() !== '15_4_1')
        );
        window.addEventListener('resize', () => {
            this.engine.resize();
          });
    }
    getEngine(){
        return this.engine;
    }

}
