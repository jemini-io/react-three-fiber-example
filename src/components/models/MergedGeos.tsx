import { group } from "console";
import { DoubleSide, InstancedMesh, LOD, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector3 } from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { generateLots } from "../PointMesh";

/**
 * This was done as a performance test and with OBJ files there's no desernable difference.
 */
export function MergedGeos() {
  const material = new MeshStandardMaterial({ color: 0xaaaaaa, side: DoubleSide, flatShading: true })
  const instances = new Array(50).fill('').map((_, i) => {
    const offsetFactor = 10
    const position: [number, number, number] = [-i * offsetFactor, 0, -i * offsetFactor]
    return position
  })

  const count = 235000
  const vectors = generateLots(count)
  const countMd = 100000 // half
  const vectorsMd = generateLots(countMd)
  const countSm = 1000 // 60000 // half
  const vectorsSm = generateLots(countSm)

  // Way more performant but only works when it's the same geometry.
  // with vectorsMd it's at 33 FPS (now 8fprs??)
  const mesh = new InstancedMesh(new ConvexGeometry(vectorsMd), material, instances.length)
  const matrix4 = new Matrix4()
  instances.forEach((position, i) => {
    matrix4.setPosition(new Vector3(...position))
    mesh.setMatrixAt(i, matrix4)
  })
  mesh.matrixAutoUpdate = false
  return (
    <primitive object={mesh} />
  )

  // With vectorsMd it's at 8 FPS with this approach.
  // const geometry = new ConvexGeometry(vectorsMd)
  // const meshes = instances.map((position, i) => {
  //   return <mesh key={i} geometry={geometry} material={material} position={[...position]} />
  // })
  // return (
  //   <group>
  //     {meshes}
  //   </group>
  // )

  // Load time is way slower, and runs at 8 FPS with vectorsMd.
  // const geometry = new ConvexGeometry(vectorsMd)
  // const geometries = instances.map((position, i) => {
  //   const clone = geometry.clone()
  //   clone.translate(...position)
  //   return clone
  // })
  // const mergedGeo = mergeBufferGeometries(geometries)
  // return (
  //   <mesh geometry={mergedGeo} material={material} />
  // )
}
