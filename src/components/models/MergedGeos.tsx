import { DoubleSide, InstancedMesh, Matrix4, MeshStandardMaterial, Vector3 } from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
import { generateLots } from "../PointCloud";

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
  const countSm = 10000 // 60000 // half
  const vectorsSm = generateLots(countSm)

  // Way more performant but only works when it's the same geometry.
  // with vectorsMd it's at 22 FPS
  // no difference with 1 obj on screen
  const mesh = new InstancedMesh(new ConvexGeometry(vectorsMd), material, instances.length)
  const matrix4 = new Matrix4()
  instances.forEach((position, i) => {
    matrix4.setPosition(new Vector3(...position))
    mesh.setMatrixAt(i, matrix4)
    mesh.updateMatrix()
    mesh.matrixAutoUpdate = false
  })
  mesh.matrixAutoUpdate = false
  return (
    <primitive object={mesh} />
  )

  // This is the standard 1 mesh per geometry approach.
  // Gives about 30 FPS with everything on screen, and 60 when only 1 on screen.
  // const geometry = new ConvexGeometry(vectorsMd)
  // const meshes = instances.map((position, i) => {
  //   return <mesh key={i} geometry={geometry} material={material} position={[...position]} />
  // })
  // return (
  //   <group>
  //     {meshes}
  //   </group>
  // )

  // Load time is way slower
  // when 1 object on screen: 25 FPS
  // when all objects: 25 FPS
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
