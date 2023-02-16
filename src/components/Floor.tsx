import { MeshProps } from "react-three-fiber"

const Floor = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  )
}

export default Floor