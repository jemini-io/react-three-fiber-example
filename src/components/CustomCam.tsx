import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { WheelEvent, useState } from "react"
import { useEvent } from "react-use"
import { Vector3 } from "three"

export const CustomCam = () => {

  const camera = useThree(({ camera }) => camera)

  const [scrollDelta, setScrollDelta] = useState(0)

  useEvent('wheel', (event: WheelEvent) => {
    setScrollDelta(event.deltaY)
  })

  useFrame(() => {
    if (scrollDelta !== 0) {
      const moveSpeed = 0.1; // Adjust this value to control the speed of camera movement

      // Trying to update the camera position so that it get's closer to the
      // lod stuff. However, the lod is using camera.zoom (which get's way high)
      // so it's thinking I'm closer to things than I am.
      const forwardVector = new Vector3(0, 0, -1);
      forwardVector.applyQuaternion(camera.quaternion);
      forwardVector.normalize();

      camera.position.add(forwardVector.clone().multiplyScalar(scrollDelta * moveSpeed));
      camera.updateProjectionMatrix();

      setScrollDelta(0); // Reset the scroll delta
    }
  })


  // in the lod example, the objects are 10 units apart with LODs at 5, 15, 30
  // so if you're zoomed in at 5 units, you'll two objects at the lowest LOD

  return (
    <OrthographicCamera
      // <PerspectiveCamera
      makeDefault
      position={[25, 25, 25]}
      // if you're 30 units away from your origin, you can then set the zoom to 30 and it will be 1:1
      zoom={1}
      // Since window resize events are going to reset the left/right/top/bottom to the be
      // the size of the viewpoint we need to react to not change this.
      manual
      near={1}
      far={5000}
      onUpdate={(camera) => {
        console.log(JSON.stringify({
          // view: [camera.left, camera.right, camera.top, camera.bottom],
          zoom: camera.zoom,
          position: camera.position,
        }))
      }}
    />
  )
}