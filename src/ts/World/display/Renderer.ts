import * as THREE from 'three'

export class Renderer{
    public renderer = new THREE.WebGLRenderer()
    constructor(){
        this.renderer.setSize(window.innerWidth, innerHeight)
        document.body.appendChild(this.renderer.domElement)
        //post processing
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.85;
        this.renderer.shadowMap.enabled = true
    }    
}