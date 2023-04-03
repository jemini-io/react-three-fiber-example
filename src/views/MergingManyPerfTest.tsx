import { MergedGeos } from "../components/models/MergedGeos"
import ObjMultiLoadAndMerge from "../components/models/ObjMultiLoadAndMerge"

function MergingManyPerfTest() {
  return (
    <>
      {/* RGB, XYZ */}
      <directionalLight intensity={1} position={[1, 0, 0]} />
      <directionalLight intensity={1} position={[-1, 0, 0]} />
      {/* <ObjMultiLoadAndMerge /> */}
      <MergedGeos />
    </>
  )
}

export default MergingManyPerfTest