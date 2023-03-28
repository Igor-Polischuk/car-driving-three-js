import { CarData } from './CarData';
import * as THREE from 'three';
import { KeyListener } from '@utility/KeysListener';
import { degreesToRadians } from '@utility/degreesToRadians';

interface ICarControllerParams {
    car: THREE.Object3D
    CarData: CarData
}

export class CarController {
    private straightDirection = new THREE.Vector3(0, 0, 1)
    private backDirection = new THREE.Vector3(0, 0, -1)
    private direction = new THREE.Vector3(0, 0, 0)
    private axis = new THREE.Vector3(0, 1, 0)

    private acceleration = 6
    private backwardAcceleration = -3
    private velocity = 0
    private maxSpeed = 70
    private maxBackwardSpeed = -40

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
        console.log(this.velocity);

    }

    private calculateDirection() {
        if (this.pressedKeys.KeyW || this.velocity > 0) {
            this.calculateCarRotation(this.straightDirection)
            this.backDirection = this.straightDirection.clone().negate()
        } else if (this.pressedKeys.KeyS || this.velocity < 0) {
            this.calculateCarRotation(this.backDirection, -1)
            this.straightDirection = this.backDirection.clone().negate()
        }
        this.direction.normalize().multiplyScalar(this.velocity)
    }

    private calculateCarRotation(directionVector: THREE.Vector3, reverse = 1){
        this.direction = directionVector.clone().normalize().multiplyScalar(this.velocity)
        if (this.pressedKeys.KeyD) {
            const angle = -degreesToRadians(this.velocity * (4 - this.velocity)) * reverse
            directionVector.applyAxisAngle(this.axis, angle)
            this.car.rotateY(angle)
        }else if (this.pressedKeys.KeyA){
            const angle = degreesToRadians(this.velocity * 2.5) * reverse
            directionVector.applyAxisAngle(this.axis, angle)
            this.car.rotateY(angle)
        }
    }

    private calculateVelocity() {
        const maxVelocity = this.maxSpeed / this.FPS
        const maxBackwardSpeed = this.maxBackwardSpeed / this.FPS
        const acceleration = this.acceleration / this.FPS / 10
        const backwardAcceleration = this.backwardAcceleration / this.FPS / 10
        this.carData.setVelocity(this.velocity)

        if (this.pressedKeys.KeyW) {
            if (this.velocity >= maxVelocity) {
                this.velocity = maxVelocity
                return
            }
            this.velocity += acceleration
        } else if (this.pressedKeys.KeyS) {
            if (this.velocity <= maxBackwardSpeed) {
                this.velocity = maxBackwardSpeed
                return
            }
            this.velocity += backwardAcceleration
        } else {
            if (this.velocity >= 0.1){
                this.velocity -= acceleration
            }else if(this.velocity <= -0.1){
                this.velocity -= backwardAcceleration
            }else{
                this.velocity = 0
            }
        }

    }
}