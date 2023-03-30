import { useTexture } from "@react-three/drei";
import { useLoader } from "react-three-fiber";
import { BufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

function ObjLoaderWithCustomMat() {
    // sub in your own files for inspection.
    const objectPath = '1_12.obj'
    // const objectPath = '4_1.obj'
    // const texturePath = '28_23.png'
    // const objectPath = 'tree/tree 1.obj'
    // const texturePath = 'util/uv_grid_opengl.jpg'
    // const texturePath = 'util/grey_metal_03_height.jpg'
    // const texturePath = 'wood-grain-texture.jpeg'

    const object = useLoader(OBJLoader, objectPath)
    // const texture = useTexture(texturePath)

    // this works well when there's a single geometry
    // and texture for the whole object.
    // Basic -> No
    // Phong -> ok but lots of roughness
    // Standard -> ok but lots of roughness
    // Matcap -> No
    // Normal -> No
    // Lambert -> 
    const customMaterial = new MeshLambertMaterial({
        color: 0x999999,
        // vertexColors: true,
        flatShading: true,

        // wireframe: true,
        // map: texture,
        // opacity: 0.5,
        // roughness: 0.1,
        // clearcoat: 0.2,
        // blending: 0.5,
        // sheen: 0.5,
        // emissive: 0x999999,
        // metalness: 0.1,
        // envMap: THREE.RoomEnvironment,
        // matcap: "https://threejs.org/examples/textures/matcaps/matcap-porcelain-white.jpg",
        side: DoubleSide
    })
    object.traverse((child: unknown) => {
        // const mesh = child as any
        if (child instanceof Mesh) {
            // const material = child.material as MeshPhongMaterial;
            child.material = customMaterial
            // material.map = texture
            // child.material.flatShading = false

            const geometry = child.geometry as BufferGeometry
            geometry.center()
            // geometry.computeVertexNormals()
            // geometry.comp
            // const intermediate = new Geometry().fromBufferGeometry(geometry)
            // child.geometry = BufferGeometryUtils.mergeVertices(geometry)


            child.castShadow = true
            child.receiveShadow = true
            // child.position.x = 10
        }
    })
    return (
        <primitive object={object} />
    )
}

export default ObjLoaderWithCustomMat