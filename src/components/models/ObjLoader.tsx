import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber";
import { BufferGeometry, DoubleSide, Mesh, MeshPhongMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjLoader() {
    // sub in your own files for inspection.
    // const objectPath = '4_1.obj'
    // const texturePath = '28_23.png'
    const objectPath = 'tree/tree.obj'
    const texturePath = 'util/uv_grid_opengl.jpg'

    const object = useLoader(OBJLoader, objectPath)
    const texture = useTexture(texturePath)

    // this works well when there's a single geometry
    // and texture for the whole object.
    object.traverse((child: unknown) => {
        // const mesh = child as any
        if (child instanceof Mesh) {
            const material = child.material as MeshPhongMaterial;
            material.map = texture
            material.side = DoubleSide

            const geometry = child.geometry as BufferGeometry
            geometry.center()

            child.castShadow = true
            child.receiveShadow = true
        }
    })
    return (
        <primitive object={object} />
    )
}

export default ObjLoader