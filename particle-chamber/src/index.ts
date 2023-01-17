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

function runSimulationStep(state: IParticleState[], speed: number, tunnelSize: number) {
    return state.reduce<IParticleState[]>((result, particle) => {
        let {direction, position} = particle
        switch (direction) {
            case Direction.Left:
                position -= speed
                break;
            case Direction.Right:
                position += speed
                break;
            default:
                throw new Error("A particle is breaking physics")
        }
        if (position >= 0 && position < tunnelSize) {
            return [
                ...result,
                { ...particle, position }
            ]
        }
        
        return [ ...result ]
    }, [])
}

export function runSimulation(speed: number, startingConfiguration: string) {
    const startOrDefault = startingConfiguration ?? ""
    const speedOrDefault = speed ?? 1
    const tunnelSize = startOrDefault.length

    const initialState = initializeParticleState(startOrDefault)
    const result = [convertStateToOutput(initialState, tunnelSize)]

    let state = initialState
    while(state.length) {
        state = runSimulationStep(state, speedOrDefault, tunnelSize)
        result.push(convertStateToOutput(state, tunnelSize))
    }

    return result
}