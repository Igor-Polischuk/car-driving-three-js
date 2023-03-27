import * as THREE from 'three';
import { KeyListener } from '@utility/KeysListener';
import { degreesToRadians } from '@utility/degreesToRadians';

export class CarController {
    private clock = new THREE.Clock();
    private timeInMotion = 0
    private startTime = 0
    private endTime = 0
    private timeInMotionRange = 0

    private straightDirection = new THREE.Vector3(0, 0, 1)
    private backDirection = new THREE.Vector3(0, 0, -1)
    private direction = new THREE.Vector3(0, 0, 0)
    private axis = new THREE.Vector3(0, 1, 0)

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
        this.pressedKeys = new KeyListener().pressedKeys
    }

    calculateCar(deltaTime: number) {
        this.FPS = 1 / deltaTime

    }

    private calculateDirection() {

    }

    private calculateVelocity() {

    }
}