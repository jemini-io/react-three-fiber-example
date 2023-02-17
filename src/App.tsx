import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import Box from './components/Box';
import Bulb from './components/Bulb';
import DragCtrls from './components/DragCtrls';
import Floor from './components/Floor';
import OrbitCtrls from './components/OrbitCtrls';
import { Physics } from '@react-three/cannon'
import Model from './components/Model';

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
        <Physics>
          {/* <fog attach={'fog'} args={['white', 1, 80]} /> */}
          <DragCtrls>
            <Bulb position={[0, 3, 0]} />
            <Box position={[-4, 3, 0]}></Box>
            <Box position={[4, 3, 0]}></Box>
          </DragCtrls>
          <DragCtrls transformGroup>
            <Model key={'1'} path='audi_quattro_sport_stock/scene.gltf' scale={[0.5, 0.5, 0.5]} position={[4, 0, 0]} />
          </DragCtrls>
          <DragCtrls transformGroup>
            <Model key={'2'} path='audi_quattro_sport_stock/scene.gltf' scale={[0.6, 0.6, 0.6]} position={[-4, 0, 0]} />
          </DragCtrls>
          <Floor position={[0, -0.5, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
