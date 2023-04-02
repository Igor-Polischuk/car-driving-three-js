import * as THREE from 'three'
import front from '@image/front.png'
import back from '@image/back.png'
import top from '@image/top.png'
import bottom from '@image/bottom.png'
import left from '@image/left.png'
import right from '@image/right.png'

export class Scene {
    public scene = new THREE.Scene()
    constructor() {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            front,
            back,
            top,
            bottom,
            left,
            right,
        ]);
        this.scene.background = texture
    }
}
