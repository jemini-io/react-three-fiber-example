import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import Bulb from './components/Bulb';
import ObjLoader from './components/models/ObjLoader';
import TreeWithUVMaps from './components/models/TreeWithUVMaps';
import OrbitCtrls from './components/OrbitCtrls';
import Forest from './views/Forest';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        <Background />
        <OrbitCtrls />
        <ambientLight intensity={0.3} />
        {/* <Bulb position={[0, 10, 0]} /> */}
        <axesHelper args={[5]} />
        {/* <ObjLoader /> */}
        {/* <TreeWithUVMaps /> */}
        <Forest />
      </Canvas>
    </div>
  );
}

export default App;
