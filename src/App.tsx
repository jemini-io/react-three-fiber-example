import './App.css';
import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, extend, MeshProps, ThreeEvent, useFrame, useLoader, useThree } from 'react-three-fiber';
import { Mesh, Object3D, TextureLoader, WebGLCubeRenderTarget } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls })

type CustomEvent = ThreeEvent<PointerEvent> & {
  object: {
    active?: boolean
  } & Object3D<THREE.Event>
}

const Floor = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial color="white" />
    </mesh>
  )
}

const OrbitCtrls = () => {
  const { camera, gl } = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]} />
  )
}

const Background = () => {
  const texture = useLoader(TextureLoader, '/rocky-hill-hdri.jpeg')
  const { gl } = useThree()
  const formatted = new WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture)
  return (
    <primitive attach='background' object={formatted.texture} />
  )
}

const Box = (props: MeshProps) => {
  const ref = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/wood-grain-texture.jpeg')
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return
    mesh.rotation.y += 0.01
    mesh.rotation.x += 0.01
  });


  // handle events
  const handleEnter = (e: CustomEvent) => {
    scaleUp(e.object)
  }
  const handleLeave = (e: CustomEvent) => {
    if (!e.object.active) {
      scaleDown(e.object)
    }
  }

  const handleClick = (e: CustomEvent) => {
    // deselect
    if (e.object.active) {
      scaleDown(GlobalState.activeMesh)
      GlobalState.activeMesh.active = false
      delete GlobalState.activeMesh
      return
    }

    e.object.active = true
    if (GlobalState?.activeMesh?.active) {
      GlobalState.activeMesh.active = false
      scaleDown(GlobalState.activeMesh)
    }
    GlobalState.activeMesh = e.object
  }

  const scaleUp = (object: Object3D<THREE.Event>) => {
    object.scale.x = 1.5;
    object.scale.y = 1.5;
    object.scale.z = 1.5;
  }
  const scaleDown = (object: Object3D<THREE.Event>) => {
    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;
  }

  return (
    <mesh ref={ref} {...props}
      castShadow
      receiveShadow
      onPointerDown={handleClick}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <sphereBufferGeometry args={[1, 100, 100]} />
      <meshPhysicalMaterial
        map={texture}
      />
    </mesh>
  );
};

const Bulb = (props: MeshProps) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive={'yellow'} />
    </mesh>
  )
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        <OrbitCtrls />
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <Background />
        {/* <fog attach={'fog'} args={['white', 1, 80]} /> */}
        <Bulb position={[0, 3, 0]} />
        <Box position={[-4, 1, 0]}></Box>
        <Box position={[4, 1, 0]}></Box>
        <Floor position={[0, -0.5, 0]} />

      </Canvas>
    </div>
  );
}


const GlobalState = {
  activeMesh: null as any,
}

export default App;
