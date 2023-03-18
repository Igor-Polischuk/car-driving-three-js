import { Camera } from "./Camera";
import { Scene } from "./Scene";
import { Renderer } from "./Renderer";

export class World {
    private scene = new Scene().scene
    private camera = new Camera().camera
    private renderer = new Renderer().renderer

    constructor() {
        this.renderer.setAnimationLoop(this.update.bind(this))
        this.changeWindowWhenResize()
    }

    update() {

        this.renderer.render(this.scene, this.camera)
    }

    private changeWindowWhenResize() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
        this.onWindowResize();
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}