import { CarData } from './CarData';
import * as THREE from 'three';
import { KeyListener } from '@utility/KeysListener';
import { degreesToRadians } from '@utility/degreesToRadians';

interface ICarControllerParams{
    car: THREE.Object3D
    CarData: CarData
}

export class CarController {
    private straightDirection = new THREE.Vector3(0, 0, 1)
    private backDirection = new THREE.Vector3(0, 0, -1)
    private direction = new THREE.Vector3(0, 0, 0)
    private axis = new THREE.Vector3(0, 1, 0)

    private acceleration = 6
    private velocity = 0
    private maxSpeed = 70

    private FPS = 1

    private car
    private pressedKeys
    carData: CarData
    constructor(params: ICarControllerParams) {
        this.car = params.car
        this.carData = params.CarData
        this.pressedKeys = new KeyListener().pressedKeys
    }

    calculateCar(deltaTime: number) {
        this.FPS = 1 / deltaTime
        this.calculateVelocity()
        this.calculateDirection()

        this.car.position.add(this.direction)
        console.log(this.direction);

    }

    private calculateDirection() {
        if (this.pressedKeys.KeyW) {
            this.direction = this.straightDirection.clone().multiplyScalar(this.velocity)
        } else if (this.pressedKeys.KeyS) {
            this.direction = this.backDirection.clone().multiplyScalar(this.velocity)
        }
        this.direction.normalize().multiplyScalar(this.velocity)
    }

    private calculateVelocity() {
        const maxVelocity = this.maxSpeed / this.FPS
        const acceleration = this.acceleration / this.FPS / 10
        this.carData.setVelocity(this.velocity)
        
        if (this.pressedKeys.KeyW) {
            if (this.velocity >= maxVelocity) {
                this.velocity = maxVelocity
                return
            }
            this.velocity += acceleration
        } else if (this.pressedKeys.KeyS) {
            this.carData.setVelocity(this.velocity * -1)
            if (this.velocity >= maxVelocity * 0.5) {
                this.velocity = maxVelocity * 0.5
                return
            }
            this.velocity += acceleration * 0.4
        } else {
            this.velocity -= acceleration * 1.4
            if (this.velocity <= 0) {
                this.velocity = 0
                return
            }
        }

    }
}