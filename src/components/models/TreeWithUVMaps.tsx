import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber"
import { BufferGeometry, DoubleSide, Mesh, MeshPhongMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Have not figured out how to use the .fbx or texture files
// for this model.
// https://free3d.com/3d-model/tree-and-ground-textured-26278.html
type TreeWithUVMapsProps = {
    position?: [number, number, number]
}
function TreeWithUVMaps(props: TreeWithUVMapsProps) {
    const objectPath = '.tmp/1_20.obj'
    // const objectPath = 'tree/tree.obj'
    const texturePath = 'util/uv_grid_opengl.jpg'

    // Must be cloned because the loaders cache the object.
    // IRL we'd load different objects probably anyway.
    const object = useLoader(OBJLoader, objectPath)
    const objectClone = object.clone();
    const texture = useTexture(texturePath)

    // this works well when there's a single geometry
    // and texture for the whole object.
    objectClone.traverse((child: unknown) => {
        const mesh = child as any
        if (mesh.isMesh) {
            const { material, geometry } = mesh as Mesh & {
                material: MeshPhongMaterial,
                geometry: BufferGeometry
            }
            material.map = texture
            material.side = DoubleSide

            // super useful when the obj file is way off center.
            geometry.center()

            // update mesh properties
            mesh.position.x = props.position?.[0] || 0
            mesh.position.y = props.position?.[1] || 0
            mesh.position.z = props.position?.[2] || 0

        }
    })

    return (
        <primitive object={objectClone} />
    )
}

export default TreeWithUVMaps