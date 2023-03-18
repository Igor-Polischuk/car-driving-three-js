export class KeyListener{
    public pressedkeys: Record<KeyboardEvent['code'], boolean> = {}

    constructor(){
        window.addEventListener('keydown', (e) => {
            this.pressedkeys[e.code] = true
        })

        window.addEventListener('keyup', (e) => {
            this.pressedkeys[e.code] = false
        })
    }
}