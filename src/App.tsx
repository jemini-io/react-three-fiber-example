import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import TreeWithFBX from './components/models/TreeWithFBX';
import OrbitCtrls from './components/OrbitCtrls';

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
        <TreeWithFBX />
      </Canvas>
    </div>
  );
}

export default App;
