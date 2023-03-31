import ObjLoaderWithCustomMat from "../components/models/ObjLoaderWithCustomMat"

function FlatMapExample() {
  return (
    <>
      {/* RGB, XYZ */}
      <directionalLight intensity={1} position={[1, 0, 0]} />
      <directionalLight intensity={1} position={[-1, 0, 0]} />
      <ObjLoaderWithCustomMat />
    </>
  )
}

export default FlatMapExample