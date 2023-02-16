import './App.css';
// import * as THREE from 'three';
import { Canvas, useFrame, extend, Object3DNode, useThree, Props, MeshProps } from 'react-three-fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

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
    <mesh ref={ref} {...props}>
      <boxGeometry></boxGeometry>
      <meshBasicMaterial color="blue"></meshBasicMaterial>
    </mesh>
  );
};

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}>
        <Box position={[-1, 1, 0]}></Box>
        <axesHelper args={[5]} />
        <OrbitCtrls />
      </Canvas>
    </div>
  );
}

export default App;
