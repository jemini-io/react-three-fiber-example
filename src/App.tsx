import { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import Bulb from './components/Bulb';
import ObjLoader from './components/models/ObjLoader';
import ObjLoaderWithCustomMat from './components/models/ObjLoaderWithCustomMat';
import TreeWithUVMaps from './components/models/TreeWithUVMaps';
import OrbitCtrls from './components/OrbitCtrls';
import Forest from './views/Forest';

function App() {

  const objRef = useRef();


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        <Background />
        <OrbitCtrls />
        <ambientLight intensity={0.1} />
        {/* <hemisphereLight intensity={0.3} /> */}

        {/* <Bulb position={[0, 0, 100]} />
        <Bulb position={[0, 0, -100]} /> */}
        <directionalLight intensity={2} position={[1, 0, 0]} />
        <directionalLight intensity={2} position={[-1, 0, 0]} />
        {/* <spotLight color={0xffffff} position={[0, 10, 0]} intensity={1} castShadow={true} /> */}
        <axesHelper args={[5]} />
        <ObjLoaderWithCustomMat />
        {/* <ObjLoader /> */}
        {/* <TreeWithUVMaps /> */}
        {/* <Forest /> */}
      </Canvas>
    </div>
  );
}

export default App;
