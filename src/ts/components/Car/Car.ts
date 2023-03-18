import * as THREE from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CarLoader } from "./CarLoader";
import { ICarParts } from "./interfaces";

interface ICarConfig {
    scene: THREE.Scene
    model: string
}


export class Car {
    public model: THREE.Group | undefined
    private config: ICarConfig
    private carParts: ICarParts | undefined
    constructor(config: ICarConfig) {
        this.config = config
        this.renderLoadedCar()
    }

    async renderLoadedCar(){
        const carLoader = new CarLoader(this.config.model)
        this.carParts = await carLoader.getCarModel()
        if (this.carParts.model){
            this.carParts.model.scale.set(0.5, 0.5, 0.5)
            this.config.scene.add(this.carParts.model)
        }
    }
}