import { ref, computed } from 'vue'
import IPlay from '../types/play';
import IPlayer from '../types/player'
import IRound from '../types/round';
import { ref as fbRef, onValue } from "firebase/database";
import { getRealtimeDatabase, updateGameAcceptingControllerState, getGameAcceptingControllerState } from '../api'


const players = ref<IPlayer[]>([]);
const plays = ref<IPlay[]>([]);
const playInputs = ref<IPlay[]>([]);
const currentRound = ref(0);
const gameKey = ref<string>();
const scoreboardMode = ref<boolean>(false);
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
    
    const loadGame = (newGameKey: string,newCurrentRound: number, newPlayers: IPlayer[], newPlays: IPlay[], acceptingController: boolean) => {
        
        if(acceptingController) {
            updateGameAcceptingControllerState(newGameKey, false);
        }

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

    const reset = () => {
        players.value = [];
        plays.value = [];
        playInputs.value = [];
        currentRound.value = 0;
        gameKey.value = undefined;
        error.value = '';
    }

    const startScoreboardMode = async () => {
        if(gameKey.value){
            await updateGameAcceptingControllerState(gameKey.value, true)
            
            const gameAcceptingControllerRef = fbRef(await getRealtimeDatabase(), `games/${gameKey.value}/acceptingController`);

            onValue(gameAcceptingControllerRef, (snapshot) => {
                const acceptingController = snapshot.val();
                console.log(acceptingController)
                if(!acceptingController){
                    scoreboardMode.value = true
                } 
            });
            
        }
    }

    const signAsController = async () => {
        if(gameKey.value){
            const isAccepting = await getGameAcceptingControllerState(gameKey.value);

            if(isAccepting) {
                await updateGameAcceptingControllerState(gameKey.value, false);
            } else {
                throw "Game is not available for a controller"
            }

        }
    }

    return({
        players,
        plays,
        currentRound,
        playInputs,
        gameKey,
        scoreboardMode,
        addPlayers,
        startGame,
        nextRound,
        loadGame,
        reset,
        startScoreboardMode,
        signAsController,
        error
    })

}

export default useFarkleState;