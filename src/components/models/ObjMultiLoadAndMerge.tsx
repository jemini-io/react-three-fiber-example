import { useLoader } from "@react-three/fiber";
import { BufferGeometry, DoubleSide, Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';

/**
 * This was done as a performance test and with OBJ files there's no desernable difference.
 */
function ObjMultiLoadAndMerge() {
  const instances = new Array(50).fill('').map((_, i) => {
    const offsetFactor = 10
    const position: [number, number, number] = [-i * offsetFactor, 0, -i * offsetFactor]
    return position
  })

  // const objectPath = '.tmp/1_20.obj'
  const objectPath = 'tree/tree.obj'
  // const texturePath = 'util/uv_grid_opengl.jpg'
  // const texture = useTexture(texturePath)
  const material = new MeshStandardMaterial({ color: 0xaaaaaa, side: DoubleSide, flatShading: true })

  const object = useLoader(OBJLoader, objectPath)
  const mesh = object.getObjectByProperty("type", "Mesh") as Mesh

  console.time('merging')
  const geometries: BufferGeometry[] = instances.map((position) => {
    // move to 0,0,0
    mesh.geometry.center()
    // offset just a little
    mesh.geometry.translate(...position)
    return mesh.geometry.clone()
  })
  const mergedGeo = mergeBufferGeometries(geometries)
  // Tends to be 1.5 seconds ~10Mb obj files.
  console.timeEnd('merging')

  return (
    <mesh geometry={mergedGeo} material={material} />
  )
}

export default ObjMultiLoadAndMerge
