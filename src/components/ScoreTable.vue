<script setup lang="ts">
  import { ref, computed, unref, toRaw} from 'vue';
  import useFarkleState from '../composables/useFarkleState';
  import IPlay from '../types/play';

  const {players, playInputs, plays, currentRound, nextRound} = useFarkleState();


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
    for(let i = 0; i < document.getElementsByClassName("farkleScoreInput").length; i++){
      document.getElementsByClassName("farkleScoreInput")[i].value = ""
    }
  }

  const handleNextRoundClick = () => {
    resetInputs();
    nextRound();
  }

</script>


<template>

  <v-table theme="light" class="scoreTable">
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
              <td v-for="player in players" :key="player.playerId">
                <input class="farkleScoreInput"  @input="event => handlePointChange(player.playerId, event.target.value)" />
              </td>
             
            </tr>
          </tbody>
        </v-table>
        <div class="gameControlsContainer">
          <v-btn class="gameControlItem" @click="handleNextRoundClick">Next Round</v-btn>
        </div>
        
</template>

<style scoped>
 .farkleScoreInput {
     border: solid;
        border-width: 1px;
        border-radius: 5px;
        padding: 3px;
     
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

