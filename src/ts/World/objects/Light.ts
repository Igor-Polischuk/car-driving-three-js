import * as THREE from "three"

export class Light {
    public ambientLight = new THREE.AmbientLight('#fff', 0.3)
    public directionLight = new THREE.DirectionalLight("#fff",1)

    constructor(scene: THREE.Scene){
        this.directionLight.castShadow = true
        scene.add(this.ambientLight, this.directionLight)
    }
}