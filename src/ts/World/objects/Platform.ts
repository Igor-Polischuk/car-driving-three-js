import * as THREE from 'three'

interface IPlatformConfig {
    textureImg: string
    width: number
    height: number
}

export class Platform {
    public plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>

    constructor(config: IPlatformConfig) {
        const planeGeometry = new THREE.PlaneGeometry(config.width, config.height)
        const texture = new THREE.TextureLoader().load(config.textureImg)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(64, 64)
        const planeMaterial = new THREE.MeshStandardMaterial({ map: texture })
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
        this.plane.rotation.x = -0.5 * Math.PI
        this.plane.receiveShadow = true
    }
}