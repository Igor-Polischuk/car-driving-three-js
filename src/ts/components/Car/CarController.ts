import { speedometer } from '@utility/speedometer';
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

    private acceleration = 0.5
    private backwardAcceleration = -0.3
    private velocity = 0
    private maxSpeed = 20
    private maxBackwardSpeed = -5

    private gear = 4

    private isPlayingSound = false

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
        this.changeGear()
        this.calculateVelocity()
        this.calculateDirection()
        this.soundsController()
        this.soundsController()

        this.car.position.add(this.direction)
    }

    private soundsController() {
        const engineSound = this.car.children[4] as THREE.Audio
        if (engineSound) {
            engineSound.setVolume(this.velocity / this.maxSpeed * this.gear);
            if (this.velocity !== 0 && !this.isPlayingSound) {
                engineSound.play();
                this.isPlayingSound = true
            } else if(this.velocity === 0 && this.isPlayingSound){
                engineSound.pause();
                this.isPlayingSound = false
            }
        }

    }

    private changeGear(){
        if (this.pressedKeys.Digit1){
            this.gear = 1
            this.maxSpeed = 5
        }else if(this.pressedKeys.Digit2){
            this.gear = 2
            this.maxSpeed = 10
        }else if(this.pressedKeys.Digit3){
            this.gear = 3
            this.maxSpeed = 15
        }else if(this.pressedKeys.Digit4){
            this.gear = 3
            this.maxSpeed = 20
        }

    }

    private calculateDirection() {
        if (this.velocity > 0) {
            this.calculateCarRotation(this.straightDirection)
            this.backDirection = this.straightDirection.clone().negate()
        } else if (this.velocity < 0) {
            this.calculateCarRotation(this.backDirection)
            this.straightDirection = this.backDirection.clone().negate()
        }
        this.direction.normalize().multiplyScalar(this.velocity)
    }

    private calculateCarRotation(directionVector: THREE.Vector3) {
        this.direction = directionVector.clone().normalize().multiplyScalar(this.velocity)
        if (this.pressedKeys.KeyD) {
            const angle = -this.getAngle()
            directionVector.applyAxisAngle(this.axis, angle)
            this.car.rotateY(angle)
        } else if (this.pressedKeys.KeyA) {
            const angle = this.getAngle()
            directionVector.applyAxisAngle(this.axis, angle)
            this.car.rotateY(angle)
        }
    }

    private getAngle() {
        return degreesToRadians(this.velocity * (10 - this.velocity * 10))
    }

    private calculateVelocity() {
        const maxVelocity = this.maxSpeed / this.FPS
        const maxBackwardSpeed = this.maxBackwardSpeed / this.FPS
        const acceleration = this.acceleration / this.FPS / 10
        const backwardAcceleration = this.backwardAcceleration / this.FPS / 10
        this.carData.setVelocity(this.velocity)
        speedometer(+(this.velocity * this.FPS * 3.6).toFixed(0))

        if (this.pressedKeys.KeyW) {
            if (this.velocity < 0) {
                this.velocity -= backwardAcceleration * 4
                return
            }
            if (this.velocity >= maxVelocity) {
                this.velocity -= acceleration
                return
            }
            this.velocity += acceleration
        } else if (this.pressedKeys.KeyS) {
            if (this.velocity > 0) {
                this.velocity -= acceleration * 6
                return
            }
            if (this.velocity <= maxBackwardSpeed) {
                this.velocity = maxBackwardSpeed
                return
            }
            this.velocity += backwardAcceleration
        } else {
            if (this.velocity >= 0.03) {
                this.velocity -= acceleration * 2
            } else if (this.velocity <= -0.03) {
                this.velocity -= backwardAcceleration * 2
            } else {
                this.velocity = 0
            }
        }

    }
}