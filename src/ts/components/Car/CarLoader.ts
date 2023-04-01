import * as THREE from "three"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ICarParts } from "./interfaces";


export class CarLoader {
    public model: THREE.Group | undefined
    public loaded: boolean = false
    private wheels: THREE.Object3D[] = []
    private frontWheels: THREE.Object3D[] = []
    private body: THREE.Object3D | undefined
    private loader = new GLTFLoader()
    private modelUrl: string
    private scene
    constructor(modelUrl: string, scene: THREE.Scene) {
        this.modelUrl = modelUrl
        this.scene = scene
    }

    async getCarModel(): Promise<ICarParts> {
        const gltf = await this.loader.loadAsync(this.modelUrl, this.onProgress.bind(this))
        this.model = gltf.scene
        this.model.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // console.log(child);
            }
        });
        this.getWheels(this.model)
        this.getBody(this.model)
        return {
            model: this.model,
            wheels: this.wheels,
            frontWheels: this.frontWheels,
            body: this.body
        }
    }


    private onProgress(progress: ProgressEvent) {
        // console.log(progress.loaded);

    }

    private getWheels(carModel: THREE.Group) {
        const wheelFrontLeft = carModel.getObjectByName('wheel_front_left')
        const wheelFrontRight = carModel.getObjectByName('wheel_front_right')
        const wheelRearRight = carModel.getObjectByName('wheel_rear_right')
        const wheelRearLeft = carModel.getObjectByName('wheel_rear_left')

        if (wheelFrontLeft && wheelFrontRight && wheelRearRight && wheelRearLeft) {
            wheelFrontLeft.position.x = 0.95
            wheelFrontRight.position.x = -0.95
            wheelFrontRight.rotateY(Math.PI)
            this.frontWheels = [this.wrapWheelInContainer(wheelFrontLeft), this.wrapWheelInContainer(wheelFrontRight)]
            this.wheels = [wheelFrontLeft, wheelFrontRight, wheelRearRight, wheelRearLeft]
        }
    }

    private wrapWheelInContainer(wheel: THREE.Object3D) {
        if (!this.model) return wheel
        const wheelContainer = new THREE.Group();
        this.model.add(wheelContainer)
        console.log(wheel.position);

        wheelContainer.position.x = wheel.position.x
        wheelContainer.position.y = wheel.position.y + 0.4
        wheelContainer.position.z = wheel.position.z + 1.8
        wheel.position.set(0, 0, 0)
        wheelContainer.add(wheel);


        return wheelContainer
    }

    private getBody(carModel: THREE.Group) {
        this.body = carModel.getObjectByName('car_body')
    }
}