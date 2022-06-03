<script setup lang="ts">
    import { computed } from 'vue'
    import useFarkleState from '../composables/useFarkleState';
    import IPlayerTotalPoints from '../types/playerTotalPoints'

    const { players, plays } = useFarkleState();

    const playerStandings = computed(() => {
    
        let playerTotals: IPlayerTotalPoints[] = players.value.map((player) => {
            let playerTotalPoints = 0;
            plays.value.forEach((play) => {
               if(play.playerId === player.playerId) playerTotalPoints += play.points;
            });
            return {
                playerId: player.playerId,
                playerName: player.name,
                totalPoints: playerTotalPoints
            }
        });

        return playerTotals.sort((a, b) => a.totalPoints - b.totalPoints).reverse();
    })
</script>


<template>

    <div class="leader-board-wrapper">
       <div class="leader-board-title">
           Leaderboard
        </div>
       <div class="leader-board-content">
           <div class="leader-board-standing"
                v-for="standing in playerStandings" :key="standing.playerId">
            {{standing.playerName}}: {{standing.totalPoints}}
           </div>
           
       </div>
    </div>
        
</template>

<style scoped>
 .leader-board-wrapper {
    margin-right:auto;
    margin-left:auto;
    width: 50%;
    background-color: #eeeeee;
    
    border-radius: .5em;
 }
 .leader-board-title {
     border-bottom-style: solid;
     border-bottom-width: .1em;
     border-bottom-color: #bbbbbb;
     padding-left: .5em;
     padding-top: .5em;
     font-size: large;
 }

 .leader-board-content {
     padding: .5em;
     padding-left: 1em;
 }
</style>

