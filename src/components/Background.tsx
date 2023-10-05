import { useMemo } from "react"
import { useFrame, useLoader, useThree } from "react-three-fiber"
import * as THREE from "three"

const Background = () => {
  const texture = useLoader(THREE.TextureLoader, '/rocky-hill-hdri.jpeg')
  const { gl } = useThree()

  useFrame(({ gl }) => {
    if (gl.info.render.frame % 120 === 0 && false) {
      console.log('renderer calls', gl.info.render.calls)
      console.log('triangles', gl.info.render.triangles);
      console.log('texture mem', gl.info.memory.textures);
      console.log('geo mem', gl.info.memory.geometries);
    }
  })

  const formatted = useMemo(() => {
    return new THREE.WebGLCubeRenderTarget(
      texture.image.height
    ).fromEquirectangularTexture(gl, texture)
  }, [gl, texture])

  return (
    <primitive attach='background' object={formatted.texture} />
  )
}

export default Background