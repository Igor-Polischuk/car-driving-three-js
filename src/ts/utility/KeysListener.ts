export class KeyListener{
    public pressedKeys: Record<KeyboardEvent['code'], boolean> = {}

    constructor(){
        window.addEventListener('keydown', (e) => {
            this.pressedKeys[e.code] = true
        })

        window.addEventListener('keyup', (e) => {
            this.pressedKeys[e.code] = false
        })
    }
}