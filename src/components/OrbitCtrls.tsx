import { extend, useThree } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
extend({ OrbitControls })

const OrbitCtrls = () => {
  const { camera, gl } = useThree()
  return (
    // Some bug where 'enabled' is not listened to so changing it in DragControls doesn't work.
    <orbitControls args={[camera, gl.domElement]} attach="orbitControls" enabled={true} />
  )
}

export default OrbitCtrls