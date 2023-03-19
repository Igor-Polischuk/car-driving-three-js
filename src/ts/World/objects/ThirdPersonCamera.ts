import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class ThirdPersonCamera {
    constructor(
        private model: THREE.Object3D,
        private camera: THREE.PerspectiveCamera,
        private orbit: OrbitControls
    ) {
        this.orbit.minDistance = 3
        this.orbit.maxDistance = 7
        this.orbit.enablePan = false
        this.orbit.maxPolarAngle = Math.PI / 2 - 0.05
    }

    update() {
        const { x, y, z } = this.model.position
        this.orbit.target.copy(this.model.position)
        this.camera.position.y = y + 3
        this.orbit.update()
    }
}