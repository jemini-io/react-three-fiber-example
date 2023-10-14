import { BoxProps, useBox } from "@react-three/cannon";
import { useRef } from "react";
import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { CustomThreeEvent } from "./types";

// DO NOT DO
const GlobalState = {
  activeMesh: null as any,
}

const Box = (props: BoxProps & MeshProps) => {
  const [ref, api] = useBox<THREE.Mesh>(() => {
    return {
      mass: 1,
      ...props
    }
  })
  const texture = useLoader(THREE.TextureLoader, '/wood-grain-texture.jpeg')

  // handle events
  const handleEnter = (e: CustomThreeEvent) => {
    scaleUp(e.object)
  }
  const handleLeave = (e: CustomThreeEvent) => {
    if (!e.object.active) {
      scaleDown(e.object)
    }
  }

  const handleClick = (e: CustomThreeEvent) => {
    // deselect
    if (e.object.active) {
      scaleDown(GlobalState.activeMesh)
      GlobalState.activeMesh.active = false
      delete GlobalState.activeMesh
      return
    }

    e.object.active = true
    if (GlobalState?.activeMesh?.active) {
      GlobalState.activeMesh.active = false
      scaleDown(GlobalState.activeMesh)
    }
    GlobalState.activeMesh = e.object
  }

  const scaleUp = (object: THREE.Object3D<THREE.Event>) => {
    object.scale.x = 1.5;
    object.scale.y = 1.5;
    object.scale.z = 1.5;
  }
  const scaleDown = (object: THREE.Object3D<THREE.Event>) => {
    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;
  }

  return (
    <mesh ref={ref}
      // @ts-ignore
      api={api}
      {...props}
      castShadow
      receiveShadow
      onPointerDown={handleClick}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <boxGeometry />
      <meshPhysicalMaterial
        map={texture}
      />
    </mesh>
  );
};


export default Box