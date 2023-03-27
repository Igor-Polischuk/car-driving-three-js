import { CarController } from './CarController';
import * as THREE from "three"
import { CarAnimator } from "./CarAnimator";
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
    private animator: CarAnimator | undefined
    private controller: CarController | undefined
    constructor(config: ICarConfig) {
        this.config = config
        this.renderLoadedCar()
    }


    updateCar(deltaTime: number){
        if(this.animator && this.controller){
           this.controller.calculateCar(deltaTime)
        }
    }

    private async renderLoadedCar(){
        const carLoader = new CarLoader(this.config.model)
        this.carParts = await carLoader.getCarModel()
        this.model = this.carParts.model
        if (this.carParts.model){
            this.carParts.model.scale.set(0.5, 0.5, 0.5)
            this.addAnimationsToCar()
            this.config.scene.add(this.carParts.model)
        }
    }

    private addAnimationsToCar(){
        if(!this.carParts) return
        if (this.carParts.body && this.carParts.model){
            this.animator = new CarAnimator({carParts: this.carParts})
            this.controller = new CarController(this.carParts.model)
        }
    }

    
}