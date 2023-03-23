import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Have not figured out how to use the .fbx or texture files
// for this model.
// https://free3d.com/3d-model/tree-and-ground-textured-26278.html
function TreeWithUVMaps() {
    const objectPath = 'tree/tree 1.obj'
    const texturePath = 'util/uv_grid_opengl.jpg'

    const object = useLoader(OBJLoader, objectPath)
    const texture = useTexture(texturePath)

    console.log(object);
    console.log(texture);

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
        }
    })

    return (
        <primitive object={object} />
    )
}

export default TreeWithUVMaps