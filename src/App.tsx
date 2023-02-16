import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import Box from './components/Box';
import Bulb from './components/Bulb';
import DragCtrls from './components/DragCtrls';
import Floor from './components/Floor';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [3, 3, 3] }}
        shadows={true}
      >
        {/* <OrbitCtrls /> */}
        <ambientLight intensity={0.2} />
        <axesHelper args={[5]} />
        <Background />
        {/* <fog attach={'fog'} args={['white', 1, 80]} /> */}
        <Bulb position={[0, 3, 0]} />
        <DragCtrls>
          <Box position={[-4, 1, 0]}></Box>
        </DragCtrls>
        <DragCtrls>
          <Box position={[4, 1, 0]}></Box>
        </DragCtrls>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
