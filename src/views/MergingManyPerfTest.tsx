import ObjMultiLoadAndMerge from "../components/models/ObjMultiLoad"

function MergingManyPerfTest() {
  return (
    <>
      {/* RGB, XYZ */}
      <directionalLight intensity={1} position={[1, 0, 0]} />
      <directionalLight intensity={1} position={[-1, 0, 0]} />
      <ObjMultiLoadAndMerge />
    </>
  )
}

export default MergingManyPerfTest