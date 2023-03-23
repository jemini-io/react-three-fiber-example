import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Have not figured out how to use the .fbx or texture files
// for this model.
// https://free3d.com/3d-model/tree-and-ground-textured-26278.html
type TreeWithUVMapsProps = {
    position?: [number, number, number]
}
function TreeWithUVMaps(props: TreeWithUVMapsProps) {
    const objectPath = 'tree/tree 1.obj'
    const texturePath = 'util/uv_grid_opengl.jpg'

    const object = useLoader(OBJLoader, objectPath)
    const texture = useTexture(texturePath)

    // this works well when there's a single geometry
    // and texture for the whole object.
    object.traverse((child: unknown) => {
        const mesh = child as any
        if (mesh.isMesh) {
            mesh.material.map = texture
            // super useful when the obj file is way off center.
            mesh.geometry.center()
            // some folks have suggested, but no useful yet.
            // mesh.geometry.computeVertexNormals()
            mesh.position.x = props.position?.[0] || 0
            mesh.position.y = props.position?.[1] || 0
            mesh.position.z = props.position?.[2] || 0
        }
    })

    return (
        <primitive object={object} />
    )
}

export default TreeWithUVMaps