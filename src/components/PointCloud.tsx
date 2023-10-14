
import { extend } from '@react-three/fiber'
import { BufferGeometry, Vector3 } from 'three'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
extend({ ConvexGeometry })

export const PointCloud = ({position}: {position: [number, number, number]}) => {
  // 1 M points
  const count = 100
  const vectors = generateLots(count)
  const pointsScale = 100 / count

  /**
   * Gonna do 2 shapes
   */
  const pointsGeometry = new BufferGeometry().setFromPoints(vectors)
  return (
    <group position={position}>
      <points scale={[5, 5, 5]}>
        <pointsMaterial color={'#ff2222'} size={pointsScale} alphaTest={0.5} />
        <primitive object={pointsGeometry} />
      </points>
      <mesh scale={[5, 5, 5]} >
        <convexGeometry args={[vectors]}> </convexGeometry>
        <meshPhysicalMaterial color={"#8888ff"} />
      </mesh >
    </group>
  )

}

export function generateLots(numVertices: number) {
  var vertices = [];
  var radius = 1;
  var pi = Math.PI;
  var phi, theta;

  for (var i = 0; i < numVertices; i++) {
    phi = Math.acos(-1 + (2 * i) / numVertices);
    theta = Math.sqrt(numVertices * pi) * phi;

    var x = radius * Math.cos(theta) * Math.sin(phi);
    var y = radius * Math.sin(theta) * Math.sin(phi);
    var z = radius * Math.cos(phi);

    vertices.push(new Vector3(x, y, z));
  }

  return vertices;
}

export default PointCloud