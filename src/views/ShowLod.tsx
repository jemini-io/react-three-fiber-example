import { LevelOfDetailTest } from "../components/models/LevelOfDetailTest"

function ShowLod() {
  return (
    <>
      {/* RGB, XYZ */}
      <directionalLight intensity={1} position={[0, 1, 0]} />
      <LevelOfDetailTest />
    </>
  )
}

export default ShowLod