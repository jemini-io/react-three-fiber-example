import { useEffect, useState } from "react"
import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry } from "three"
import GLTFLoaderWithCustomMat from "../components/models/GLTFLoaderWithCustomMat"

/**
 * Component will rerender anytime state changes.
 * useEffect deps will check current vs last value to see if they
 * should rerun.
 */
function IncrementalRender() {
  console.log('running IncrementalRender');
  const [clear, setClear] = useState<boolean>(false)
  const [counter, setCounter] = useState<number>(0)
  const [objects, setObjects] = useState<Object3D[]>([])
  const [models, setModels] = useState<JSX.Element[]>([])

  // on mount, and after clear is changed.
  useEffect(() => {
    if (clear) {
      return
    }
    setTimeout(() => {
      setClear(true)
    }, 1000)
    // if clear is false, create interval
    const interval =
      setInterval(() => {
        console.log('running interval');
        setCounter(counter => counter + 1)
      }, 100)
    if (clear) {
      clearInterval(interval)
    }
    // Will run when this useEffect reruns
    return () => {
      console.log('use effect rerendering, running dismount');
      clearInterval(interval)
    }
  }, [clear])

  useEffect(() => {
    console.log('creating new objects because counter');

    if (counter % 10 === 0) {
      console.log('updating modelCount');
      const modelList = createModels()
      setModels(models => models.concat(modelList))
    }
    const pointMesh = createObject(counter)
    setObjects(objects => objects.concat(pointMesh))


  }, [counter])

  return (
    <>
      {objects.map(el => {
        return <primitive object={el} />
      })}
      {models}
    </>
  )
}

function createModels() {
  const models = []
  for (let i = 0; i < 25; i++) {
    const modelCount = i
    const position: [number, number, number] = [
      modelCount * -2,
      0,
      0,
    ]
    const model = <GLTFLoaderWithCustomMat key={modelCount} position={position} />
    models.push(model)
  }
  return models
}

function createObject(count: number) {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16)
  const pointMesh = new Mesh(
    new SphereGeometry(1, 100, 100),
    new MeshBasicMaterial({ color: color })
  )
  // random x, y, z positions
  pointMesh.position.x = Math.random() * 10
  pointMesh.position.y = Math.random() * 10
  pointMesh.position.z = Math.random() * 10

  return pointMesh
}

export default IncrementalRender
