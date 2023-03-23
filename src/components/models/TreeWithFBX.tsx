import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// https://free3d.com/3d-model/tree-and-ground-textured-26278.html
function TreeWithFBX() {
    const objectPath = 'tree/tree 1.obj'
    const texturePath = 'util/uv_grid_opengl.jpg'

    const object = useLoader(OBJLoader, objectPath)
    const texture = useTexture(texturePath)

    console.log(object);
    console.log(texture);

    object.traverse((child: unknown) => {
        const mesh = child as any
        if (mesh.isMesh) {
            mesh.material.map = texture
        }
    })

    return (
        <primitive object={object} />
    )
}

export default TreeWithFBX