import { Triplet, useBox } from "@react-three/cannon"
import { PropsWithChildren, useMemo, useState } from "react"
import { Object3DProps, PrimitiveProps, useLoader } from "react-three-fiber"
import { BufferGeometry, Group } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export type ModelProps = {
  path: string,
  modelScale: Triplet
} & PropsWithChildren & Object3DProps
export default function Model(props: ModelProps) {
  const { scene } = useLoader(GLTFLoader, props.path)
  const copiedScene = useMemo(() => scene.clone(), [scene])
  const dims: Triplet = [3, 2.5, 6.5]
  const [ref, api] = useBox<THREE.Group>(() => {
    return {
      mass: 1,
      position: props.position as Triplet,
      args: dims
    }
  })
  return (
    <group
      ref={ref}
      //@ts-ignore
      api={api}
    >
      <mesh
        visible={props.visible}
        // position={props.position}
        scale={dims}
      >
        <boxGeometry></boxGeometry>
        <meshBasicMaterial wireframe></meshBasicMaterial>
      </mesh>
      <group position={[0, -1.2, 0]}>
        <primitive object={copiedScene} scale={props.modelScale} />
      </group>
    </group>
  )
}
