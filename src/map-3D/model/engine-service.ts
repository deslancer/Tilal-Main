import * as BABYLON from 'babylonjs';

export class EngineService{
    private readonly engine: BABYLON.Engine;
    constructor(canvas: HTMLCanvasElement){
        this.engine = new BABYLON.Engine(canvas, true, undefined, true);
        window.addEventListener('resize', () => {
            this.engine.resize();
          });
    }
    getEngine(){
        return this.engine;
    }

}
