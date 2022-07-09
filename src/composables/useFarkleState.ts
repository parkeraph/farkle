import { ref, computed } from 'vue'
import IPlay from '../types/play';
import IPlayer from '../types/player'
import IRound from '../types/round';


const players = ref<IPlayer[]>([]);
const plays = ref<IPlay[]>([]);
const playInputs = ref<IPlay[]>([]);
const currentRound = ref(0);
const gameKey = ref<string>();
const error = ref('');

const useFarkleState = () => {
    
    const startGame = (newGameKey: string) => {
        currentRound.value++;
        gameKey.value = newGameKey;

        playInputs.value = players.value.map(player => {
            return {
                playerId: player.playerId, 
                points: 0, 
                roundNumber: currentRound.value
            }
        })
    }

    const addPlayers = (newPlayers : IPlayer[]) => {
        if (currentRound.value == 0) {
            newPlayers.forEach(newPlayer => {
                players.value.push(newPlayer);
            });
        }  
    }

    const nextRound = () => {

        try{  

            plays.value = plays.value.concat([...playInputs.value])

            currentRound.value++;

            playInputs.value = players.value.map(player => {
                return {
                    playerId: player.playerId, 
                    points: 0, roundNumber: 
                    currentRound.value}
            })


            

        } catch (e) {
            error.value = "Error getting next round: "+String(e);
            console.error("Error getting next round: "+String(e))
        }

    }
    
    const loadGame = (newGameKey: string,newCurrentRound: number, newPlayers: IPlayer[], newPlays: IPlay[]) => {
        
        gameKey.value = newGameKey;
        currentRound.value = newCurrentRound;
        players.value = newPlayers;
        plays.value = newPlays;

        playInputs.value = players.value.map(player => {
            return {
                playerId: player.playerId, 
                points: 0, roundNumber: 
                currentRound.value}
        })

    }

    return({
        players,
        plays,
        currentRound,
        playInputs,
        gameKey,
        addPlayers,
        startGame,
        nextRound,
        loadGame,
        error
    })

}

export default useFarkleState;