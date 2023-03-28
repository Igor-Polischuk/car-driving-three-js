export function speedometer(velocity: number){
    const speedometerContainer = document.querySelector<HTMLSpanElement>('.speed')!
    speedometerContainer.innerText = velocity.toString()
}