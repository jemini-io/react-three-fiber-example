
export function LotsOfBoxes() {
  const clusterDim = 100
  const getBoxes = () => {
    const boxes = []
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * clusterDim - clusterDim / 2
      let y = Math.random() * clusterDim - clusterDim / 2
      let z = Math.random() * clusterDim - clusterDim / 2
      const randomColor = Math.random() * 0xffffff

      boxes.push(
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial attach="material" color={randomColor} />
        </mesh>
      )
    }
    return boxes
  }
  return (
    <>
      {getBoxes()}
    </>
  )
}