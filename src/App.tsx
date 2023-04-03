import { Stats } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import MergingManyPerfTest from './views/MergingManyPerfTest';
import ShowLod from './views/ShowLod';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      // frameloop={'demand'}
      >
        <Stats />
        <Background />
        <OrbitCtrls />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        {/* <MergingManyPerfTest /> */}
        <ShowLod />
      </Canvas>
    </div>
  );
}

export default App;
