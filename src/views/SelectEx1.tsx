import { useThree } from "@react-three/fiber";
import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEvent } from "react-use";
import { Object3D, Vector2 } from "three";
import { SelectionBox } from "three/examples/jsm/interactive/SelectionBox";

const getCoords = (clientX: number, clientY: number, canvas: HTMLCanvasElement) => {
  const canvasRect = canvas.getBoundingClientRect();
  const canvasWidth = canvasRect.width;
  const canvasHeight = canvasRect.height;

  // Calculate the mouse position relative to the canvas
  const x = ((clientX - canvasRect.left) / canvasWidth) * 2 - 1;
  const y = -((clientY - canvasRect.top) / canvasHeight) * 2 + 1;

  return [x, y];
  // [(clientX / window.innerWidth) * 2 - 1,
  // -(clientY / window.innerHeight) * 2 + 1]
};

const setSelectedStyle = (collection: any[], selected: boolean) => {
  for (const item of collection) {
    if (item.material) {
      // @ts-ignore
      item.material.linewidth = selected ? 3 : 1;
    }
  }
};

interface SelectionProps {
  onSelectionChanged?(objects: Object3D[]): void;
  style?: CSSProperties;
}

export const Selection: FC<SelectionProps> = ({
  style,
  onSelectionChanged,
}) => {
  const { camera, scene, gl } = useThree();
  const [start, setStart] = useState<Vector2>();
  const [mouse, setMouse] = useState<[number, number]>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [selection, setSelection] = useState<Object3D[]>([]);
  const selectRectangle = useRef(document.createElement("div"));

  useEffect(() => {
    onSelectionChanged?.call(null, selection);
  }, [selection, onSelectionChanged]);

  useEffect(() => {
    selectRectangle.current.classList.add("selectBox");
    selectRectangle.current.style.pointerEvents = "none";
    for (const key in style) {
      const val = (style as any)[key];
      selectRectangle.current.style.setProperty(
        key
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/[\s_]+/g, "-")
          .toLowerCase(),
        val
      );
    }
  }, [selectRectangle, style]);

  useEffect(() => {
    if (isSelecting && start && mouse) {
      gl.domElement.parentElement?.append(selectRectangle.current);

      const topLeft = {
        x: Math.min(start.x, mouse[0]),
        y: Math.min(start.y, mouse[1]),
      };
      const bottomRight = {
        x: Math.max(start.x, mouse[0]),
        y: Math.max(start.y, mouse[1]),
      };

      selectRectangle.current.style.left = `${topLeft.x}px`;
      selectRectangle.current.style.top = `${topLeft.y}px`;
      selectRectangle.current.style.width = `${bottomRight.x - topLeft.x}px`;
      selectRectangle.current.style.height = `${bottomRight.y - topLeft.y}px`;
    } else {
      selectRectangle.current.parentElement?.removeChild(
        selectRectangle.current
      );
    }
  }, [isSelecting, gl, start, mouse, selectRectangle]);

  const selectionBox = useMemo(
    () => new SelectionBox(camera, scene),
    [scene, camera]
  );

  const appendSelection = useCallback(
    (toAppend: any[]) => {
      setSelection([...selection, ...toAppend]);
    },
    [selection]
  );

  const onPointerDown = useCallback(
    (e: Event) => {
      const event = e as PointerEvent;
      // console.log('pointerdown', event.clientX, event.clientY, event.offsetX, event.offsetY, event.pageX, event.pageY, event.screenX, event.screenY, event.x, event.y)
      // console.log('canvas', gl.domElement.width, gl.domElement.height, gl.domElement.clientWidth, gl.domElement.clientHeight)
      // console.log(gl.domElement.getBoundingClientRect())
      
      const { clientX, clientY, altKey, ctrlKey, button } = event;
      if (!altKey && !isSelecting && !button) {
        const [startX, startY] = getCoords(clientX, clientY, gl.domElement);
        setStart(new Vector2(clientX, clientY));
        setIsSelecting(true);
        if (!ctrlKey) {
          setSelectedStyle(selection, false);
        }
        selectionBox.startPoint.set(startX, startY, 0.5);
        selectionBox.endPoint.set(startX, startY, 0.5);
      }
    },
    [selection]
  );

  const onPointerMove = useCallback(
    (e: Event) => {
      if (!isSelecting) return;
      const { clientX, clientY } = e as PointerEvent;
      const [endX, endY] = getCoords(clientX, clientY, gl.domElement);
      setMouse([clientX, clientY]);
      selectionBox.select();
      setSelectedStyle(selectionBox.collection, false);

      selectionBox.endPoint.set(endX, endY, 0.5);
      selectionBox.select();

      setSelectedStyle(selectionBox.collection, true);
    },
    [isSelecting]
  );

  const onPointerUp = useCallback(
    (e: Event) => {
      const { ctrlKey, clientX, clientY, button } = e as PointerEvent;

      if (isSelecting || !button) {
        setIsSelecting(false);

        const [endX, endY] = getCoords(clientX, clientY, gl.domElement);
        selectionBox.endPoint.set(endX, endY, 0.5);
        const curSelected = selectionBox.select();

        setMouse(undefined);
        setStart(undefined);

        if (ctrlKey) {
          appendSelection(curSelected);
        } else {
          setSelection(curSelected);
        }

        setSelectedStyle(selectionBox.collection, true);
      }
    },
    [isSelecting]
  );

  useEvent("pointerdown", onPointerDown, gl.domElement);
  useEvent("pointermove", onPointerMove, gl.domElement);
  useEvent("pointerup", onPointerUp, gl.domElement);

  return <></>;
};