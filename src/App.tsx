import { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import FlatMapExample from './views/FlatMapExample';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        <Background />
        <OrbitCtrls />
        <ambientLight intensity={0.1} />
        <axesHelper args={[5]} />
        <FlatMapExample />
      </Canvas>
    </div>
  );
}

export default App;
