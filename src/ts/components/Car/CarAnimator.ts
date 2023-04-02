import { CarData } from './CarData';
import { degreesToRadians } from "@utility/degreesToRadians";
import { ICarParts } from "./interfaces";
import { KeyListener } from '@utility/KeysListener';

interface ICarAnimatorConfig {
    carParts: Required<ICarParts>
    carData: CarData
}

export class CarAnimator {
    readonly states: Record<string, () => void> = {
        dispersal: this.dispersal.bind(this),
        turnToTheLeft: this.turnToTheLeft.bind(this),
        turnToTheRight: this.turnToTheRight.bind(this),
        bodyToTheLeft: this.bodyToTheLeft.bind(this),
        bodyToTheRight: this.bodyToTheRight.bind(this),
        suddenStop: this.suddenStop.bind(this),
        turnTo: this.turnTo.bind(this),
        bodyTilt: this.bodyTilt.bind(this)
    }

    private pressedKeys = new KeyListener().pressedKeys

    private velocity = 0
    private frontWheelRotate = 0

    private carParts
    private carData

    constructor(config: ICarAnimatorConfig) {
        this.carParts = config.carParts
        this.carData = config.carData

        this.carData.subscribe('velocity', this.setVelocity.bind(this))
    }

    setStates(states: (keyof typeof this.states)[] | string[]) {
        states.forEach(state => {
            this.states[state]()
        })
    }

    private setVelocity(value: number) {
        this.velocity = value
    }

    private dispersal() {
        const { wheels } = this.carParts
        wheels.forEach(wheel => {
            wheel.rotation.x += this.velocity * 3
        })
    }

    private turnTo() {
        this.calculateFrontWheelRotate()
        const { frontWheels } = this.carParts
        frontWheels.forEach(wheel => {
            wheel.rotation.y = this.frontWheelRotate
        })
    }

    private calculateFrontWheelRotate() {
        if (this.pressedKeys.KeyA && this.frontWheelRotate < degreesToRadians(40)) {
            this.frontWheelRotate += degreesToRadians(5)
        } else if (this.pressedKeys.KeyD && this.frontWheelRotate > degreesToRadians(-40)) {
            this.frontWheelRotate -= degreesToRadians(5)
        } else {
            if (this.frontWheelRotate > 0.01) {
                this.frontWheelRotate -= degreesToRadians(5);

            } else if (this.frontWheelRotate < -0.01) {
                this.frontWheelRotate += degreesToRadians(5);
            } else {
                this.frontWheelRotate = 0;
            }
        }
    }

    private bodyTilt(){
        const { body } = this.carParts
        if (!body) return
        body.rotation.z = (this.frontWheelRotate * this.velocity) / 7
    }

    private bodyToTheLeft() {
        const { body } = this.carParts
        if (!body) return
        body.rotation.z = degreesToRadians(-4)
    }

    private turnToTheLeft() {
        const { frontWheels } = this.carParts
        frontWheels.forEach(wheel => {
            wheel.rotation.y += wheel.rotation.y < degreesToRadians(35) ? degreesToRadians(4) : 0
        })
    }

    private bodyToTheRight() {
        const { body } = this.carParts
        if (!body) return
        body.rotation.z = degreesToRadians(4)
    }

    private turnToTheRight() {
        const { frontWheels } = this.carParts
        frontWheels.forEach(wheel => {
            wheel.rotation.y -= wheel.rotation.y > -degreesToRadians(35) ? degreesToRadians(4) : 0
        })
    }

    private suddenStop() {
        const { body, wheels } = this.carParts
        if (!body) return
        wheels.forEach(wheel => {
            wheel.rotation.y = 0
        })
        const maxAngle = degreesToRadians(3)

        if (body.rotation.x < maxAngle) {
            body.rotation.x += 0.005
        }

    }
}