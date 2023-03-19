import * as THREE from 'three';
import { KeyListener } from '@utility/KeysListener';

export class CarController {
    private clock = new THREE.Clock();
    private timeInMotion = 0
    private startTime = 0
    private endTime = 0
    private timeInMotionRange = 0

    private straigtDirection = new THREE.Vector3(0, 0, 1)
    private backDirection = new THREE.Vector3(0, 0, -1)
    private direction = new THREE.Vector3(0, 0, 0)

    private acceleration = 10
    private velocity = 0
    private maxSpeed = 55
    private timeToMaxSpeed = this.maxSpeed / this.acceleration

    private prevFrameTime = 0
    private FPS = 1

    private car
    private pressedKeys
    constructor(car: THREE.Object3D) {
        this.car = car
        this.pressedKeys = new KeyListener().pressedkeys
    }

    calculateCar(deltaTime: number) {
        this.FPS = 1 / deltaTime
        this.calculateSecondsInMotion()
        this.calculateVelocity()
        this.calculateDirection()
        console.log(this.velocity);

        this.car.position.add(this.direction)
    }

    private calculateDirection() {
        const velocity = this.velocity / (this.FPS)

        if (this.velocity > 0.1) {
            if (this.pressedKeys.KeyW) {
                this.straigtDirection.normalize().multiplyScalar(velocity)
                this.direction = this.straigtDirection.clone()
            }
            if (this.pressedKeys.KeyS) {
                this.backDirection.normalize().multiplyScalar(velocity)
                this.direction = this.backDirection.clone()
            }
        } else {
            this.direction.normalize().multiplyScalar(velocity)
        }

    }

    private calculateVelocity() {
        if (this.startTime === 0) {
            this.velocity = (this.acceleration * this.timeInMotion) * 0.3
        } else {
            this.velocity = this.acceleration * this.timeInMotion

        }
        if (this.velocity >= this.maxSpeed) {
            this.velocity = this.maxSpeed
        }
        this.velocity = Math.ceil(this.velocity)
    }

    private calculateSecondsInMotion() {
        if (this.pressedKeys.KeyW || this.pressedKeys.KeyS) {
            if (this.startTime === 0) {
                this.startTime = this.clock.getElapsedTime(); // зберігаємо час початку натиску
            }
            const elapsedTime = this.clock.getElapsedTime() - this.startTime; // обчислюємо різницю між поточним часом та часом початку натиску
            this.timeInMotion = elapsedTime
            this.timeInMotionRange = this.timeInMotion
            this.endTime = 0
        } else {
            if (this.timeInMotion <= 0) {
                this.timeInMotion = 0
                return
            }
            if (this.endTime === 0) {
                this.endTime = this.clock.getElapsedTime(); // зберігаємо час початку натиску
            }

            if (this.timeInMotion > this.timeToMaxSpeed) {
                this.timeInMotion = this.timeToMaxSpeed
            }
            const elapsedTime = this.clock.getElapsedTime() - this.endTime; // обчислюємо різницю між поточним часом та часом початку натиску
            this.timeInMotion = this.timeInMotionRange - elapsedTime
            this.startTime = 0
        }
    }
}