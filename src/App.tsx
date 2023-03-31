import { Stats } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import Forest from './views/Forest';
import MergingManyPerfTest from './views/MergingManyPerfTest';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        <Stats />
        <Background />
        <OrbitCtrls />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        <MergingManyPerfTest />
        {/* <Forest /> */}
      </Canvas>
    </div>
  );
}

export default App;
