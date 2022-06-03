import { ref, computed } from 'vue'
import IPlay from '../types/play';
import IPlayer from '../types/player'
import IRound from '../types/round';


const players = ref<IPlayer[]>([]);
const plays = ref<IPlay[]>([]);
const playInputs = ref<IPlay[]>([]);
const currentRound = ref(0);
const error = ref('');

const useFarkleState = () => {
    
    const startGame = () => {
        currentRound.value++;

        playInputs.value = players.value.map(player => {
            return {
                playerId: player.playerId, 
                points: 0, roundNumber: 
                currentRound.value}
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

    
    return({
        players,
        plays,
        currentRound,
        playInputs,
        addPlayers,
        startGame,
        nextRound,
        error,
    })

}

export default useFarkleState;