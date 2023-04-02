import * as THREE from 'three'

interface IPlatformConfig {
    width: number
    height: number
}

export class Platform {
    public plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>

    constructor(config: IPlatformConfig) {
        const planeGeometry = new THREE.PlaneGeometry(config.width, config.height)
        const planeMaterial = new THREE.MeshPhysicalMaterial({ color: '#fff', roughness: 0, flatShading: true })
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
        this.plane.rotation.x = -0.5 * Math.PI
        this.plane.receiveShadow = true
    }
}