import './App.css';
// import * as THREE from 'three';
import { Canvas, useFrame, extend, Object3DNode, useThree, Props, MeshProps } from 'react-three-fiber';
import { useRef } from 'react';
import { DoubleSide, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

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

const Box = (props: MeshProps) => {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
  });
  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxGeometry></boxGeometry>
      <meshPhysicalMaterial color="blue" />
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
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3], fov: 5 }}
        shadows={true}
      >
        <OrbitCtrls />
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <Bulb position={[0, 3, 0]} />
        <Box position={[-1, 1, 0]}></Box>
        <Floor position={[0, -0.5, 0]} />

      </Canvas>
    </div>
  );
}

export default App;
