import play from './play'

interface IRound {
    roundNumber: number,
    plays: play[]
}

export default IRound