import { Light } from './objects/Light';
import { Platform } from './objects/Platform';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Camera } from "./display/Camera";
import { Scene } from "./display/Scene";
import { Renderer } from "./display/Renderer";

import floorTexture from '@image/floor.jpg'
import { KeyListener } from '@utility/KeysListener';
import { Car } from '@components/Car/Car';
import { ThirdPersonCamera } from './objects/ThirdPersonCamera';

export class World {
    private scene = new Scene().scene
    private camera = new Camera().camera
    private renderer = new Renderer().renderer
    private orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    private porshe: Car
    private lastFrameTime = 0;
    constructor() {
        this.renderer.setAnimationLoop(this.update.bind(this))
        this.changeWindowWhenResize()
        this.orbitControls.update()
        new Light(this.scene)
        new KeyListener()
        const plane = new Platform({
            width: 1000,
            height: 1000,
            textureImg: floorTexture
        }).plane
        this.scene.add(plane)
        this.porshe = new Car({ model: '../../assets/models/car.glb', scene: this.scene })
    }

    update(date: number) {
        const deltaTime = (date - this.lastFrameTime) / 1000; // перетворюємо час в секунди
        this.lastFrameTime = date;
        if (this.porshe.model) {
            new ThirdPersonCamera(this.porshe.model, this.camera, this.orbitControls).update()
        }
        this.porshe.updateCar(deltaTime)
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