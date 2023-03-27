import { CarData } from './CarData';
import { degreesToRadians } from "@utility/degreesToRadians";
import { ICarParts } from "./interfaces";

interface ICarAnimatorConfig{
    carParts: Required<ICarParts>
    carData: CarData
}

export class CarAnimator{
    readonly states = {
        dispersal: this.dispersal.bind(this),
        turnToTheLeft: this.turnToTheLeft.bind(this),
        turnToTheRight: this.turnToTheRight.bind(this),
        bodyToTheLeft: this.bodyToTheLeft.bind(this),
        bodyToTheRight: this.bodyToTheRight.bind(this),
        suddenStop: this.suddenStop.bind(this),
    }

    private velocity = 0

    private carParts
    private carData

    constructor(config: ICarAnimatorConfig){
        this.carParts = config.carParts
        this.carData = config.carData

        this.carData.subscribe('velocity', this.setVelocity.bind(this))
    }

    setStates(states: (keyof typeof this.states)[]){
        states.forEach(state => {
            this.states[state]()
        })
    }

    private setVelocity(value: number){
        this.velocity = value
    }

    private dispersal(){
        
        const {wheels} = this.carParts
        wheels.forEach(wheel => {
            wheel.rotation.x += this.velocity
        })
    }

    private bodyToTheLeft(){
        const {body} = this.carParts
        if (!body) return
        body.rotation.z = degreesToRadians(-4)
    }

    private turnToTheLeft(){
        const {frontWheels} = this.carParts
        frontWheels.forEach(wheel => {
            wheel.rotation.y +=  wheel.rotation.y < degreesToRadians(35) ? degreesToRadians(2) : 0
        })
    }

    private bodyToTheRight(){
        const {body} = this.carParts
        if (!body) return
        body.rotation.z = degreesToRadians(4)
    }

    private turnToTheRight(){
        const {frontWheels} = this.carParts
        frontWheels.forEach(wheel => {
            wheel.rotation.y -=  wheel.rotation.y > -degreesToRadians(35) ? degreesToRadians(2) : 0
        })
    }

    private suddenStop(){
        const {body, wheels} = this.carParts
        if (!body) return
        wheels.forEach(wheel => {
            wheel.rotation.y =  0
        })
        const maxAngle = degreesToRadians(3)
        
        if(body.rotation.x < maxAngle){
            body.rotation.x += 0.005
        }
        
    }
}