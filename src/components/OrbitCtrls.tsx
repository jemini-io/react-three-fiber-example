import { extend, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const OrbitCtrls = ({ target }: any) => {
  const { camera, gl } = useThree()

  return (
    // Some bug where 'enabled' is not listened to so changing it in DragControls doesn't work.
    <OrbitControls
      enabled={true}
      enableRotate={false}
      enableZoom={false}
      enableDamping={false}
      camera={camera}
      makeDefault
      target={[0, 0, 0]}
    />
  )
}

export default OrbitCtrls