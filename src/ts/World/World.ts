import { Platform } from './objects/Platform';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Camera } from "./display/Camera";
import { Scene } from "./display/Scene";
import { Renderer } from "./display/Renderer";

export class World {
    private scene = new Scene().scene
    private camera = new Camera().camera
    private renderer = new Renderer().renderer
    private orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

    constructor() {
        this.renderer.setAnimationLoop(this.update.bind(this))
        this.changeWindowWhenResize()
        this.orbitControls.update()
        const plane = new Platform({
            width: 100,
            height: 100,
            textureImg: '../../assets/images/floor.jpg'
        }).plane

        this.scene.add(plane)
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