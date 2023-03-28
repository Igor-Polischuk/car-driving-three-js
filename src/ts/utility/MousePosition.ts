export class MousePosition {
    readonly current = {
        x: 0,
        y: 0,
    }

    readonly prev = {
        x: 0,
        y: 0,
    }
    constructor() {
        this.listenMouse()
        
    }

    private listenMouse() {
        window.addEventListener('mousemove', e => {
            const x = e.offsetX
            const y = e.offsetY
            this.prev.x = this.current.x
            this.prev.y = this.current.y
            this.current.x = x
            this.current.y = y
        })
    }
}