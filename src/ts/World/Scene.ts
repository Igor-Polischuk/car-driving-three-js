import * as THREE from 'three'

export class Scene {
    public scene = new THREE.Scene()
    constructor() {
        this.scene.background = new THREE.Color('skyblue');
    }
}
