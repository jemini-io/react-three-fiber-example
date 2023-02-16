import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { extend, useThree } from 'react-three-fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls'

extend({ DragControls })

const DragCtrls = (props: PropsWithChildren) => {
  const groupRef = useRef<THREE.Group>(null)
  const { camera, gl } = useThree()

  const [children, setChildren] = useState<any>([])
  useEffect(() => {
    setChildren(groupRef.current?.children)
  })

  return (
    <group ref={groupRef}>
      <dragControls
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
    // <dragControls></dragControls>
  )

}
export default DragCtrls;