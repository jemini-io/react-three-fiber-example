import { useRef } from "react"
import { MeshProps } from "react-three-fiber"
import { useHelper } from '@react-three/drei/native'
import { PointLight, PointLightHelper } from "three"

const Bulb = (props: MeshProps) => {
  const lightRef = useRef<any>(null)
  useHelper(lightRef, PointLightHelper)
  return (
    <mesh {...props}>
      <pointLight ref={lightRef} castShadow intensity={1} />
      {/* <rectAreaLight ref={lightRef} castShadow intensity={10} lookAt={[0, 0, 0] as any} /> */}
      <sphereGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive={'yellow'} />
    </mesh>
  )
}

export default Bulb