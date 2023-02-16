import './App.css';
// import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

const Box = () => {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
  });
  return (
    <mesh ref={ref}>
      <boxGeometry></boxGeometry>
      <meshBasicMaterial color="blue"></meshBasicMaterial>
    </mesh>
  );
};

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }}>
        <Box></Box>
      </Canvas>
    </div>
  );
}

export default App;
