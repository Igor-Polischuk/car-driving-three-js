export interface ICarParts {
    model: THREE.Group | undefined
    wheels: THREE.Object3D[]
    body: THREE.Object3D | undefined
    frontWheels: THREE.Object3D[]
}