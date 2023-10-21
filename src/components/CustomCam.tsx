import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { WheelEvent, useEffect, useState } from "react"
import { useEvent } from "react-use"
import { Box3, Mesh, Object3D, Vector3 } from "three"
import { OrthographicCamera as OrthographicCameraType } from "three"
import { Geometry, OrbitControls } from "three-stdlib"

export const CustomCam = () => {
  const camera = useThree(({ camera }) => camera)
  const controls = useThree(({ controls }) => controls)
  const gl = useThree(({ gl }) => gl)
  const scene = useThree(({ scene }) => scene)
  const [scrollDelta, setScrollDelta] = useState(0)
  const [maxDim, setMaxDim] = useState(10)

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
    console.log('aspect', aspect)
  }

  /**
   * This will set the max distance of the camera/viewport
   * based on the bounding box of the scene.
   * Could also be used as the `far` value of the camera.
   */
  const sceneBB = new Box3();
  const localBbBox = new Box3();
  const dims = new Vector3()
  const computeSceneBoundingBox = () => {
    scene.traverse((child) => {
      if ((child as Mesh).geometry) {
        const { geometry } = child as Mesh
        geometry.computeBoundingBox();
        localBbBox.copy(geometry.boundingBox as Box3);
        child.updateMatrixWorld(true);
        localBbBox.applyMatrix4(child.matrixWorld);

        sceneBB.union(localBbBox);
      }
    })
    sceneBB.getSize(dims)
    const maxDim = Math.max(...dims.toArray())
    setMaxDim(maxDim)
    return maxDim
  }

  /**
   * This will resize the viewport when the window is resized.
   */
  useEvent('resize', () => {
    resizeViewport(gl.domElement.width, gl.domElement.height)
  })

  // Custom zoom handler
  useEvent('wheel', (event: WheelEvent) => {
    setScrollDelta(event.deltaY)
  })
  useEvent('keyup', (event: KeyboardEvent) => {
    if (event.key === 'a') {
      console.log('resetting scene...')
      const maxDim = computeSceneBoundingBox()
      // resizeViewport(gl.domElement.width, gl.domElement.height)
      // camera.updateProjectionMatrix()
      // calc and apply defaults
      // try to view whole scene from target and max dimension

      const oCam = camera as OrthographicCameraType
      const oCtrls = controls as OrbitControls

      const defaultTarget = new Vector3(0, 0, 0)
      const defaultNormal = new Vector3(1, 1, 1).normalize()
      const defaultPosition = defaultTarget.clone().add(defaultNormal.clone().multiplyScalar(maxDim))

      const distanceToTarget = defaultPosition.distanceTo(defaultTarget)
      console.log(distanceToTarget)
      const aspect = gl.domElement.width / gl.domElement.height
      // let top = Math.sqrt(distanceToTarget * aspect)
      let top = maxDim

      oCam.right = top * aspect
      oCam.left = -top * aspect
      oCam.top = top
      oCam.bottom = -top
      oCam.far = 500000//maxDim * 2
      oCam.zoom = 1

      camera.position.copy(defaultPosition)
      oCtrls.target.copy(defaultTarget)
      camera.updateProjectionMatrix()
      console.log('distance', distanceToTarget, 'maxDim', maxDim, 'aspect', aspect)
      console.log('initial top and right', top, top * aspect)
    }
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
      const distanceToTarget = oCtrls.target.distanceTo(camera.position)
      console.log('distance', distanceToTarget, 'maxDim', maxDim)
      // Set max custom zoom
      if (distanceToTarget < 5) {
        // Can zoom in more once you hit the max camera position
        if (direction < 0) {
          camera.zoom *= 1.1
          return;
        }
        if (direction > 0 && camera.zoom > 1) {
          camera.zoom = 1
          return;
        }
      }
      // Set min custom zoom
      // if (distanceToTarget > maxDim && direction > 0) {
      //   return
      // }

      // Set a viewport zoom factor
      const viewPortResizePercent = 0.2;
      const moveDistance = oCam.top * (direction * viewPortResizePercent)
      resizeViewport(gl.domElement.width, gl.domElement.height, moveDistance)

      // Move the camera's position without changing the zoom
      // so that the LOD calculations are correct
      // Get the opposite direction of the camera
      // set the position is from the target, in that direction
      // based on the viewport size
      const flippedDirNormal = camera.getWorldDirection(new Vector3()).normalize().multiplyScalar(-1)
      const distanceFactor = oCam.top * oCam.right / (gl.domElement.width / gl.domElement.height);
      const newPosition = oCtrls.target.clone().add(flippedDirNormal.multiplyScalar(distanceFactor))
      camera.position.copy(newPosition)
      console.log('new top and right', oCam.top, oCam.right)
    }
  })

  return (
    <OrthographicCamera
      // <PerspectiveCamera
      makeDefault
      position={[1, 1, 1]}
      zoom={1}
      manual
      near={1}
      far={1}
      left={1}
      right={-1}
      top={1}
      bottom={-1}
    />
  )
}