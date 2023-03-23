import { Physics } from '@react-three/cannon'
import Bulb from '../components/Bulb'
import DragCtrls from '../components/DragCtrls'
import Floor from '../components/Floor'
import Model from '../components/Model'

function CarsAndPhysics() {
    return (
        <Physics>
            <DragCtrls>
                <Bulb position={[0, 8, 0]} />
            </DragCtrls>
            <DragCtrls transformGroup>
                <Model key={'1'} path='audi_quattro_sport_stock/scene.gltf' modelScale={[0.55, 0.5, 0.45]} position={[4, 2, 0]} visible={false} />
            </DragCtrls>
            <DragCtrls transformGroup>
                <Model key={'2'} path='audi_quattro_sport_stock/scene.gltf' modelScale={[0.6, 0.6, 0.6]} position={[-4, 2, 0]} visible={false} />
            </DragCtrls>
            <Floor position={[0, -0.5, 0]} />
        </Physics>
    )
}

export default CarsAndPhysics