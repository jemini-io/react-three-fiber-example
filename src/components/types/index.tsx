import { Object3DNode, ThreeEvent } from 'react-three-fiber';
import { Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: Object3DNode<
      OrbitControls,
      typeof OrbitControls
    >;
  }
}

export type CustomThreeEvent = ThreeEvent<PointerEvent> & {
  object: {
    active?: boolean
  } & Object3D<THREE.Event>
}

