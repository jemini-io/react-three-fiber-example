import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import Forest from './views/Forest';
import MergingManyPerfTest from './views/MergingManyPerfTest';
import ShowLod from './views/ShowLod';
import StressLines from './views/StressLines';
import { LotsOfBoxes } from './views/LotsOfBoxes';
import { CustomCam } from './components/CustomCam';
import { useState } from 'react';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }}
        shadows={true}
      // camera={{ position: [25, 25, 25] }}
      >
        <CustomCam />
        {/* <Stats className='stats' /> */}
        <Background />
        {/* <ShowLod /> */}
        <OrbitCtrls />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        <LotsOfBoxes />

      </Canvas>
    </div>
  );
}

export default App;
