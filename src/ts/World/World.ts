import { Light } from './objects/Light';
import { Platform } from './objects/Platform';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Camera } from "./display/Camera";
import { Scene } from "./display/Scene";
import { Renderer } from "./display/Renderer";

import { KeyListener } from '@utility/KeysListener';
import { Car } from '@components/Car/Car';
import * as THREE from 'three';
import { ThirdPersonCamera } from './objects/ThirdPersonCamera';


export class World {
    private scene = new Scene().scene
    private camera = new Camera().camera
    private renderer = new Renderer().renderer
    private orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    private car: Car
    private lastFrameTime = 0;
    constructor() {
        this.renderer.setAnimationLoop(this.update.bind(this))
        this.changeWindowWhenResize()
        this.orbitControls.update()
        new Light(this.scene)
        new KeyListener()
        this.car = new Car({ model: '../../assets/models/cyber.glb', scene: this.scene })
        const gridHelper = new THREE.GridHelper(50, 50, "black")
        const plane = new Platform({width: 50, height: 50})
        this.scene.add(plane.plane, gridHelper)
    }

    update(date: number) {
        const deltaTime = (date - this.lastFrameTime) / 1000; 
        this.lastFrameTime = date;
        this.car.updateCar(deltaTime)
        // if(this.car.model){
        //     new ThirdPersonCamera(this.car.model, this.camera, this.orbitControls).update()
        // }
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