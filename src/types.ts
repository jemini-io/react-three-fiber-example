import { Object3DNode } from '@react-three/fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: Object3DNode<
      OrbitControls,
      typeof OrbitControls
    >;
    dragControls: Object3DNode<
      DragControls,
      typeof DragControls
    >;
  }
}
