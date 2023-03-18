import { Camera } from "./Camera";
import { Scene } from "./Scene";
import { Renderer } from "./Renderer";

export class World{
    private scene = new Scene().scene
    private camera = new Camera().camera
    private renderer = new Renderer().renderer

    constructor(){
        this.renderer.setAnimationLoop(this.update.bind(this))
        
    }

    update(){
        
        this.renderer.render(this.scene, this.camera)
    }
}