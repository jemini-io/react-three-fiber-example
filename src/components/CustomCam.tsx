import { OrthographicCamera } from "@react-three/drei"
import { useFrame } from "react-three-fiber"

export const CustomCam = () => {

  // useFrame(({ camera }) => {
  //   // dolly in and out
  //   // write a sin function to make zoom go in and out by 5 units
  //   camera.zoom = Math.sin(Date.now() * 0.001) * 2 + 12
  //   camera.updateProjectionMatrix()
  // })

  return (
    <OrthographicCamera
      makeDefault
      position={[0, 0, 25]}
      // if you're 30 units away from your origin, you can then set the zoom to 30 and it will be 1:1
      zoom={15}
      // Since window resize events are going to reset the left/right/top/bottom to the be
      // the size of the viewpoint we need to react to not change this.
      left={-20}
      right={20}
      top={20}
      bottom={-20}
      // near={1}
      // far={500}
      manual={true}
      onUpdate={(camera) => {
        console.log(JSON.stringify({
          view: [camera.left, camera.right, camera.top, camera.bottom],
          zoom: camera.zoom,
          position: camera.position,
        }))
      }}
    />
  )
}