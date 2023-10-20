import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { WheelEvent, useEffect, useState } from "react"
import { useEvent } from "react-use"
import { Vector3 } from "three"
import { OrthographicCamera as OrthographicCameraType } from "three"
import { OrbitControls } from "three-stdlib"

export const CustomCam = () => {
  const camera = useThree(({ camera }) => camera)
  const controls = useThree(({ controls }) => controls)
  const gl = useThree(({ gl }) => gl)
  const [scrollDelta, setScrollDelta] = useState(0)

  const noEvents = true

  // Set initial and resized viewport
  // TODO: Use zustand to update the viewport after load.
  const resizeViewport = (width: number, height: number, offset: number = 0) => {
    const oCam = camera as OrthographicCameraType
    const aspect = width / height
    const newVewPort = oCam.top + offset

    oCam.left = -newVewPort * aspect
    oCam.right = newVewPort * aspect
    oCam.top = newVewPort
    oCam.bottom = -newVewPort
  }
  useEffect(() => {
    resizeViewport(gl.domElement.width, gl.domElement.height)
  }, [])
  useEvent('resize', () => {
    resizeViewport(gl.domElement.width, gl.domElement.height)
  })


  // Custom zoom handler
  useEvent('wheel', (event: WheelEvent) => {
    setScrollDelta(event.deltaY)
  })

  useFrame(() => {
    const oCam = camera as OrthographicCameraType
    const oCtrls = controls as OrbitControls
    // Will change the position of the camera based on the scroll delta
    // necessary so that the distance calculations the LOD will do are correct
    if (scrollDelta !== 0) {
      setScrollDelta(0); // Reset the scroll delta
      const direction = Math.sign(scrollDelta)

      // Set reasonable limits, otherwise we end up in the negative
      // TODO: use the math way to divide distance to object so that you're
      // zooming into the target.
      const distanceToTarget = oCtrls.target.distanceTo(camera.position)
      if (distanceToTarget < 5 && direction < 0) {
        // Can zoom in more once you hit the max camera position
        camera.zoom *= 1.1
        return;
      }
      if (distanceToTarget > 50 && direction > 0) {
        camera.zoom /= 1.1
        return
      }
      camera.zoom = 1

      // TODO: play with moveDistance and camera.position
      // right now it's 10% change of the top value and
      // +/- 1 unit in the direction of the camera.
      const viewPortResizePercent = 0.1;
      const cameraMoveUnit = direction * 1;
      const moveDistance = oCam.top * (direction * viewPortResizePercent)
      resizeViewport(gl.domElement.width, gl.domElement.height, moveDistance)

      // Move the camera's position without changing the zoom
      // so that the LOD calculations are correct
      const dirNormal = camera.getWorldDirection(new Vector3()).normalize()
      camera.position.sub(dirNormal.multiplyScalar(cameraMoveUnit))

      //
      console.log('oCam.top', oCam.top)
      console.log('position', camera.position.toArray())
    }


  })

  return (
    <OrthographicCamera
      // <PerspectiveCamera
      makeDefault
      position={[15, 15, 15]}
      zoom={1}
      manual
      near={1}
      far={5000}
      left={5}
      right={-5}
      top={5}
      bottom={-5}
    />
  )
}