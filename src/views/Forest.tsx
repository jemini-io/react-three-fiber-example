import TreeWithUVMaps from "../components/models/TreeWithUVMaps"

function Forest() {
    const trees = new Array(50).fill('').map((_, i) => {
        const offsetFactor = 10
        const position: [number, number, number] = [-i * offsetFactor, 0, -i * offsetFactor]
        return <TreeWithUVMaps key={i} position={position} />
    })
    return (
        <>
            {trees}
        </>
    )
}

export default Forest