import { extend, useThree } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
extend({ OrbitControls })

const OrbitCtrls = () => {
  const { camera, gl } = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]} />
  )
}

export default OrbitCtrls