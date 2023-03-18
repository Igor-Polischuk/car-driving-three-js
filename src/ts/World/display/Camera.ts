import * as THREE from 'three'

export class Camera{
    public camera = new THREE.PerspectiveCamera(65, window.innerWidth / innerHeight, 0.1, 1000)
    constructor(){
        this.camera.position.set(5, 5, 5)
    }
}