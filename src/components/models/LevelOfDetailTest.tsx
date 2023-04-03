import { Color, DoubleSide, LOD, Mesh, MeshStandardMaterial } from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
import { generateLots } from "../PointMesh";

/**
 * This was done as a performance test and with OBJ files there's no desernable difference.
 */
export function LevelOfDetailTest() {
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

  const geometries = [
    {
      geo: new ConvexGeometry(vectors), dist: 5,
      material: new MeshStandardMaterial({ color: 0xaaaaaa, side: DoubleSide, flatShading: true })
    },
    {
      geo: new ConvexGeometry(vectorsMd), dist: 15,
      material: new MeshStandardMaterial({ color: 0xaaffaa, side: DoubleSide, flatShading: true })
    },
    {
      geo: new ConvexGeometry(vectorsSm), dist: 30,
      material: new MeshStandardMaterial({ color: 0xaaaaff, side: DoubleSide, flatShading: true })
    },
  ]
  const lods = instances.map((position, i) => {
    const lod = new LOD()
    geometries.forEach(({ geo, dist, material }) => {
      const mesh = new Mesh(geo, material)
      // mesh.matrixAutoUpdate = false
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      // mesh.position.set(...position)
      lod.addLevel(mesh, dist)
      lod.position.set(...position)
      // lod.updateMatrix()
      // lod.matrixAutoUpdate = false
    })
    return <primitive key={i} object={lod} />
  })
  return (
    <group>
      {lods}
    </group>
  )
}

