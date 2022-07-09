<script setup lang="ts">
  import { ref, computed, unref, toRaw} from 'vue';
  import useFarkleState from '../composables/useFarkleState';
  import IPlay from '../types/play';
  import { updateGame } from '../api';

  const {gameKey, players, playInputs, plays, currentRound, nextRound} = useFarkleState();


  const playsByRound = computed(() => {
    let rounds: Array<{roundNumber: number, plays: IPlay[]}> = [];

    for(let i = 0; i < currentRound.value; i++){
      const roundPlays = plays.value.filter(play => play.roundNumber == i)
      
      rounds.push({plays: roundPlays, roundNumber: i})
    }
    return rounds
  })

  const handlePointChange = (playerId: number, newPointValue: string) => {
        
        playInputs.value = playInputs.value.map((playInput) => {
            if(playInput.playerId === playerId) {
                return {...playInput, points: parseInt(newPointValue)}
            }else{
                return playInput
            }
        })
  }

  const resetInputs = () => {
    for(let i = 0; i < document.getElementsByClassName("scoreInput").length; i++){
      document.getElementsByClassName("scoreInput")[i].value = ""
    }
  }

  const handleNextRoundClick = async () => {
    resetInputs();
    nextRound();
    
    if(gameKey.value) {
      await updateGame(gameKey.value, currentRound.value, players.value, plays.value);
    }
  }

</script>


<template>
      <div id="tableWrapper">
          <v-table 
            theme="light" 
            class="scoreTable" 
            max-width="50"
          >
            <thead>
              <tr>
                <th class="text-left">
                  Round
                </th>
                <th v-for="player in players" :key="player.playerId">
                {{ player.name }}
                </th>

              </tr>
            </thead>
            <tbody>
            
                <tr
                  v-for="round in playsByRound.slice(1)"
                  :key="round.roundNumber"
                >
                  <td>{{ round.roundNumber }}.</td>
                  <td v-for="play in round.plays" :key="play.playerId">
                    {{play.points}}
                  </td>
                </tr>
            
              <tr>
                <td>{{ currentRound }}.</td>
                <td 
                  v-for="player in players" 
                  :key="player.playerId"
                  class="scoreInputRowItem"
                >
                  <input 
                    class="scoreInput" 
                    inputmode="numeric"  
                    @input="event => handlePointChange(player.playerId, event.target.value)"
                  />
                </td>
              
              </tr>
            </tbody>
          </v-table>
        <div class="gameControlsContainer">
          <v-btn class="gameControlItem" @click="handleNextRoundClick">Next Round</v-btn>
        </div>
      </div>
        
</template>

<style scoped>

  #tableWrapper {
    width:80%;
    margin: 0 auto 0 auto;
  }

  @media screen and (max-width: 600px) {
     #tableWrapper {
      width: 100%
     }
  }

 .scoreInput {
    border: solid;
    border-width: 1px;
    border-radius: 5px;
    padding: 3px;
    width: 100%;
     
 }
 
 .gameControlsContainer {
   display: flex;
   flex-direction: row-reverse;
   margin-top: 1em;
 }

 .pointRecord {
   width: 50%;
   margin-left: 5em;
 }
</style>

