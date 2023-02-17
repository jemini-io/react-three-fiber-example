import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { extend, useThree } from 'react-three-fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

extend({ DragControls })

const DragCtrls = (props: PropsWithChildren & Partial<DragControls>) => {
  const groupRef = useRef<THREE.Group>(null)
  const controlsRef = useRef<DragControls>(null)

  const { camera, gl, scene } = useThree()

  const [children, setChildren] = useState<any>([])
  useEffect(() => {
    setChildren(groupRef.current?.children)
  }, [])

  useEffect(() => {
    controlsRef.current?.addEventListener('hoveron', () => {
      const { orbitControls } = scene as any
      orbitControls.enabled = false
    })
    controlsRef.current?.addEventListener('hoveroff', () => {
      const { orbitControls } = scene as any
      orbitControls.enabled = true
    })
    controlsRef.current?.addEventListener('dragstart', (e: any) => {
      e.object.api?.mass.set(0)
    })
    controlsRef.current?.addEventListener('dragend', (e: any) => {
      e.object.api?.mass.set(1)
    })
    controlsRef.current?.addEventListener('drag', (e: any) => {
      e.object.api?.position.copy(e.object.position)
      e.object.api?.velocity.set(0, 0, 0)
      // console.log(e)
    })

  }, [children, scene])

  return (
    <group ref={groupRef}>
      <dragControls
        transformGroup={props.transformGroup}
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  )

}
export default DragCtrls;