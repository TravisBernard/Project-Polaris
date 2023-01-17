enum Direction {
    Left,
    Right
}

interface IParticleState {
    direction: Direction,
    position: number
}

/**
 * Runs the simulation.  When provided with a numeric particle speed, and a string
 * representing the initial state of particles (see initializeParticleState for format) 
 * it will output a list of tunnel states.  Each entry in the array represents one step 
 * of the simulation and the value is state of the tunnel for that step step.  See 
 * convertStateToOutput for the output format for each step.  When no more particles are
 * in the tunnel the simulation ends.
 * 
 * @param speed number
 * @param startingConfiguration string
 * @returns string[]
 */
export function runSimulation(speed: number, startingConfiguration: string) {
    const startOrDefault = startingConfiguration ?? ""
    const speedOrDefault = Math.max(speed, 1)
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

/**
 * Converts a string of style ".R..LR." into a list of particle states.  A 'R' means a
 * particle moving right, 'L' means a particle moving left, '.' is a position with no
 * particle.  Particle state consists of a direction (Right or Left) and a position
 * which is determined by the position within the string (0-indexed).
 * 
 * Note: Characters other than 'R' or 'L' are invalid and treated as '.'
 * 
 * @param startingConfiguration string
 * @returns IParticleState[]
 */
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

/**
 * For a tunnel of 'tunnelLength' length, outputs a string where '.' means an empty
 * position and 'X' means one or more particles are in the position.
 * 
 * @param state IParticleState[]
 * @param tunnelLength number
 * @returns string
 */
function convertStateToOutput(state: IParticleState[], tunnelLength: number) {
    const emptyTunnel: string[] = Array(tunnelLength).fill(".")
    const filledTunnel = state.reduce<string[]>((tunnel, particle) => {
        tunnel[particle.position] = "X"
        return tunnel
    }, emptyTunnel)
    return filledTunnel.join("")
}

/**
 * Run one simulation step.  Moves all particles in 'state' by 'speed' positions.  If 
 * the particles exit either side of the tunnel they are removed from the result.
 * Returns an updated list of particle states where each particle is moved to it's new
 * position - or removed if it left the tunnel.
 * 
 * @param state IParticleState[]
 * @param speed number
 * @param tunnelSize number
 * @returns IParticleState[]
 */
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