import { MeshProps } from "react-three-fiber"

const Bulb = (props: MeshProps) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive={'yellow'} />
    </mesh>
  )
}

export default Bulb