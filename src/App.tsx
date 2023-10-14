import { Stats } from '@react-three/drei';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Background from './components/Background';
import OrbitCtrls from './components/OrbitCtrls';
import { Selection } from './views/SelectEx1';
import {PointCloud} from './components/PointCloud';

function App() {

  return (
    <div style={{ paddingLeft: '25%', width: '50%', height: '100vh' }}>
      <Canvas style={{ background: 'black' }} camera={{ position: [50, 40, 30] }}
        shadows={true}
      >
        {/* <Stats className='stats' /> */}
        <Background />
        {/* <OrbitCtrls /> */}
        <axesHelper args={[5]} />
        <ambientLight intensity={0.2} />
        {/* <Forest /> */}
        {/* <ShowLod /> */}
        {/* <SelectionExample /> */}
        <PointCloud position={[1,-10,1]} />
        <PointCloud position={[15,0,15]} />
        <Selection
          style={{
            border: "1px dashed #55aaff",
            backgroundColor: "rgba(75, 160, 255, 0.3)",
            position: "fixed",
          }}
          onSelectionChanged={(objs) => {
            console.log(objs);
          }}
        />
      </Canvas>
    </div>
  );
}

export default App;
