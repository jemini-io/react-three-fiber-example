import { useLoader } from "react-three-fiber";
import { BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFLoadederWithCustomMatProps = {
    position?: [number, number, number]
}
function GLTFLoaderWithCustomMat(props: GLTFLoadederWithCustomMatProps) {
    const objectPath = '.tmp/mar-5/1_84.glb'
    const object = useLoader(GLTFLoader, objectPath)
    const objectClone = object.scene.clone();

    objectClone.traverse((child: unknown) => {
        const mesh = child as any
        if (mesh.isMesh) {
            const { geometry } = mesh as Mesh & {
                material: MeshStandardMaterial,
                geometry: BufferGeometry
            }
            geometry.center()
            mesh.position.x = props.position?.[0] || 0
            mesh.position.y = props.position?.[1] || 0
            mesh.position.z = props.position?.[2] || 0

        }
    })

    return (
        <primitive object={objectClone} />
    )
}

export default GLTFLoaderWithCustomMat