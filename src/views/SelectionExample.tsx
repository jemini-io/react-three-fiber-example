import { Line } from '@react-three/drei';
import { useEffect, useRef, useState } from "react";
import { extend, useThree } from 'react-three-fiber';

import { MathUtils, PerspectiveCamera, Vector2, Vector3 } from "three";
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox';
import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper';

extend({ SelectionBox })
extend({ SelectionHelper })


function SelectionExample() {
  const [lassoStart, setStart] = useState(new Vector2());
  const [lassoEnd, setEnd] = useState(new Vector2());
  const [isLassoDrawing, setIsLassoDrawing] = useState(false);
  // const [selectionScale, setSelectionScale] = useState(new Vector3());
  const { gl, camera, scene } = useThree()
  const {} = useRef()

  const canvas = gl.domElement

  useEffect(() => {
    // if (!gl) { return }

    const handleMouseDown = (event: PointerEvent) => {
      setIsLassoDrawing(true);
      lassoStart.x = (event.clientX / canvas.clientWidth) * 2 - 1;
      lassoStart.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
      console.log('mousedown')
      console.log(event.clientX, event.clientY, canvas.clientWidth, canvas.clientHeight, lassoStart)
      setStart(lassoStart)
    };

    const handleMouseMove = (event: PointerEvent) => {
      if (!isLassoDrawing) return;

      lassoEnd.x = (event.clientX / canvas.clientWidth) * 2 - 1;
      lassoEnd.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
      setEnd(lassoEnd)
    };

    const handleMouseUp = (event: PointerEvent) => {
      lassoEnd.x = (event.clientX / canvas.clientWidth) * 2 - 1;
      lassoEnd.y = -(event.clientY / canvas.clientHeight) * 2 + 1;
      setEnd(lassoEnd)
      console.log(event.clientX, event.clientY, canvas.clientWidth, canvas.clientHeight, lassoEnd)
      console.log('mouseup')
      setIsLassoDrawing(false);
    };

    gl.domElement.addEventListener('pointermove', handleMouseMove);
    gl.domElement.addEventListener('pointerdown', handleMouseDown);
    gl.domElement.addEventListener('pointerup', handleMouseUp);
    return () => {
      gl.domElement.removeEventListener('pointermove', handleMouseMove);
      gl.domElement.removeEventListener('pointerdown', handleMouseDown);
      gl.domElement.removeEventListener('pointerup', handleMouseUp);
    }
  }, [camera, canvas.clientHeight, canvas.clientWidth, gl, gl.domElement, isLassoDrawing, lassoEnd, lassoStart])

  console.log(camera, scene, gl)
  console.log('lassoStart:', lassoStart, 'lassoEnd', lassoEnd)
  return (
    <>
      {/* <Line scale={selectionScale} points={[lassoStart, lassoEnd]} color={'red'} lineWidth={4}></Line> */}
      <selectionBox args={[camera, scene]} 
        startPoint={new Vector3(lassoStart.x, lassoStart.y, 0.5)}
        endPoint={new Vector3(lassoEnd.x, lassoEnd.y, 0.5)}
        />
      <selectionHelper args={[gl, 'selectBox']} isDown={true} />
    </>
  );
}

export default SelectionExample;