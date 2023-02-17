import { PropsWithChildren, useState } from "react"
import { PrimitiveProps, useLoader } from "react-three-fiber"
import { BufferGeometry, Group } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export type ModelProps = {
  path: string
} & PropsWithChildren
export default function Model(props: ModelProps & Omit<PrimitiveProps, 'object'>) {
  const model = useLoader(GLTFLoader, props.path)

  const [geometry, setGeometry] = useState<Group>()

  if (!geometry) {
    const scene = model.scene.clone(true)
    setGeometry(scene)
  }

  return (
    <primitive object={geometry as object} {...props} />
  )
}
