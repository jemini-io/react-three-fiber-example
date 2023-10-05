import { Object3DNode, extend } from 'react-three-fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js';

extend({ OrbitControls })
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
    selectionBox: Object3DNode<
      SelectionBox,
      typeof SelectionBox
    >;
    selectionHelper: Object3DNode<
      SelectionHelper,
      typeof SelectionHelper
    >;
  }
}
