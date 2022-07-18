<script setup lang="ts">
    import { onMounted, computed, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import useFarkleState from '../composables/useFarkleState'
    import IPlayerTotalPoints from '../types/playerTotalPoints'

    const { listenForGameUpdates, players, plays } = useFarkleState();
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
            
        console.info("Loading game key: ", route.params.gameKey);
        const gameKey = String(route.params.gameKey);
        
        //The jumbotron is not activated open the game view
        if(!plays.value.length && !players.value.length) {
            router.push(`/game/${gameKey}`)
        }

        try {
            listenForGameUpdates();
        } catch (e) {
            router.push({name: 'gameNotFound'})
        }
                
            
    });

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

    let standingOrder = 0;

    
</script>

<template>
    <div class="jumbotronWrapper">

        <h1>Leaderboard</h1>

        <div class="table">
            
            <div class="standingOrderColumn">
                <div class="columnItem" v-for="standing in playerStandings" :key="standing.playerId">
                   <span>{{playerStandings.indexOf(standing) + 1}}.</span>
                </div>
            </div>

            <div class="nameColumn">
                <div class="columnItem" v-for="standing in playerStandings" :key="standing.playerId">
                   <span>{{standing.playerName}}</span>
                </div>
            </div>

            <div class="scoreColumn">
                <div class="columnItem" v-for="standing in playerStandings" :key="standing.playerId">
                    <span>{{standing.totalPoints}}</span>
                </div>
            </div>
            
        </div>
    </div>
        
</template>

<style scoped>

    .jumbotronWrapper {
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin: .5em 0 0 0;
        text-align: center;
    }

    .playerStanding {
        display: flex;
        border-bottom-style: solid;
        border-width: 1px;
        margin: 0 auto 10px auto;

        padding: 1em;
    }

    .playerStandingItem {
        font-weight: 800;
        font-size: x-large;
        margin: 0 3em 0 0
    }

    .table {
        margin: 4em auto 0 auto;
        width: 65%;
        display: flex;
    }

    @media screen and (min-width: 1200px) {
     .table {
        width: 40%;
    }
  }

    @media screen and (max-width: 850px) {
     .table {
        width: 95%;
    }
  }

    .nameColumn {
        width: 25em;
    }

    .scoreColumn {
        width: 15em
    }

    .columnItem {
        padding: .5em 0em .5em 3em;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        font-size: x-large;
    }
    .standingOrderColumn {

    }
    
</style>
