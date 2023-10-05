import { Line, Bvh } from '@react-three/drei'
import { Vector3 } from 'three'

function StressLines() {

  function createLine(id: number, vectorCount: number) {
    const vectors = generateZigZagVectors(id, vectorCount)
    // const vectors = generateRandomVectors(id, vectorCount)
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
    return (
      <mesh key={id}>
        <Line key={id} points={vectors} color={color} />
      </mesh>
    )
  }

  const meshNumber = 300
  const list = new Array(meshNumber).fill(0)

  return (
    <>
      {/* <mesh> */}
      {list.map((_, index) => { return createLine(index, 300) })}
      {/* </mesh> */}
    </>
  )
}

// draw a big square of rectangles
function generateZigZagVectors(offset: number, count: number): Vector3[] {
  // const length = count
  const vectors: Vector3[] = []
  for (let i = 0; i < count; i++) {
    const mod = i % 2 === 0 ? 1 : -1
    vectors.push(new Vector3(offset + mod, i, 0))
  }
  return vectors
}


function generateRandomVectors(offset: number, count: number): Vector3[] {
  const vectors: Vector3[] = []
  for (let i = 0; i < count; i++) {
    vectors.push(new Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10))
  }
  return vectors

}

export default StressLines