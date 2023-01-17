enum Direction {
    Left,
    Right
}

interface IParticleState {
    direction: Direction,
    position: number
}

function initializeParticleState(startingConfiguration: string) {
    return startingConfiguration.split("").reduce<IParticleState[]>((state, c, i) => {
        switch (c.toUpperCase()) {
            case 'R':
                return [ ...state, { direction: Direction.Right, position: i }]
            case 'L':
                return [ ...state, { direction: Direction.Left, position: i }]
            default:
                return [ ...state ]
        }
    }, [])
}

function convertStateToOutput(state: IParticleState[], tunnelLength: number) {
    const emptyTunnel: string[] = Array(tunnelLength).fill(".")
    const filledTunnel = state.reduce<string[]>((tunnel, particle) => {
        tunnel[particle.position] = "X"
        return tunnel
    }, emptyTunnel)
    return filledTunnel.join("")
}

export function runSimulation(speed: number, startingConfiguration: string) {
    const startOrDefault = startingConfiguration ?? ""
    const speedOrDefault = speed ?? 1
    const tunnelSize = startOrDefault.length
    const result = []

    const state = initializeParticleState(startOrDefault)
    result.push(convertStateToOutput(state, tunnelSize))

    return result
}