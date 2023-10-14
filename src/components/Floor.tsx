import { BodyProps, BoxProps, useBox } from "@react-three/cannon"
import { MeshProps, NodeProps } from "@react-three/fiber"

const Floor = (props: BoxProps & MeshProps) => {
  const dimensions: any = [20, 1, 10]
  const [ref, api] = useBox<THREE.Mesh>(() => {
    return {
      args: dimensions,
      ...props
    }
  })
  return (
    <mesh ref={ref} {...props} receiveShadow>
      <boxGeometry args={dimensions} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  )
}

export default Floor