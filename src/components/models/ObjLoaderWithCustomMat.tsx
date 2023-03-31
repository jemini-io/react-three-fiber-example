import { useLoader } from "react-three-fiber";
import { BufferGeometry, DoubleSide, Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function ObjLoaderWithCustomMat() {
    // sub in your own files for inspection.
    // const objectPath = '1_12.obj'
    const objectPath = 'tree/tree.obj'

    const object = useLoader(OBJLoader, objectPath)
    const customMaterial = new MeshStandardMaterial({
        color: 0xaa9999,
        flatShading: true,
        side: DoubleSide
    })
    object.traverse((child: unknown) => {
        if (child instanceof Mesh) {
            child.material = customMaterial
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

export default ObjLoaderWithCustomMat