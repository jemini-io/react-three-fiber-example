import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import Forest from './views/Forest';
import MergingManyPerfTest from './views/MergingManyPerfTest';
import ShowLod from './views/ShowLod';
import StressLines from './views/StressLines';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [30, 30, 30], fov: 50, far: 2000 }}
        shadows={true}
      >
        <Stats className='stats' />
        <Background />
        <OrbitCtrls />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        {/* <Forest /> */}
        {/* <ShowLod /> */}
        <StressLines />
      </Canvas>
    </div>
  );
}

export default App;
