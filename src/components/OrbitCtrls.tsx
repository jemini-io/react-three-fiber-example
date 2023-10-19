import { extend, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const OrbitCtrls = ({ target }: any) => {
  const { camera, gl } = useThree()

  return (
    // Some bug where 'enabled' is not listened to so changing it in DragControls doesn't work.
    <OrbitControls
      enabled={true}
      enableZoom
      enableDamping={false}
      camera={camera}
      makeDefault
      target={target}
    />
  )
}

export default OrbitCtrls