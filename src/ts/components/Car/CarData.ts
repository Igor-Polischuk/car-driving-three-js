import { Observer } from './../../utility/Observer/Observer';

interface ICarDataObservedValues {
    velocity: number
}

export class CarData extends Observer<ICarDataObservedValues>{
    private velocity: number
    constructor(data: ICarDataObservedValues){
        super()
        this.velocity = data.velocity
    }

    setVelocity(velocity: number){
        this.velocity = velocity
        this.notifyAll('velocity', velocity)
    }
}