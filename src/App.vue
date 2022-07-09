<script setup lang="ts">
  import PlayerSelection from './components/PlayerSelection.vue';
  import ScoreTable from './components/ScoreTable.vue';
  import useFarkleState from './composables/useFarkleState';
  import ScoreBoard from './components/ScoreBoard.vue';
  import { getGame } from './api';
  import { ref, computed } from 'vue';

  const { currentRound, gameKey, loadGame } = useFarkleState();

  const loadGameModalOpen = ref<boolean>(false);
  const loadGameKeyInput = ref<string>('');
  const loadGameError = ref<string>('');
  const isLoadGameError = ref<boolean>(false);
  const gameKeyModalOpen = ref<boolean>(false);

  const handleLoadGameButtonClick = async () => {
    try {
      const loadedGame = await getGame(loadGameKeyInput.value);
      loadGameModalOpen.value = false;
      loadGame(loadGameKeyInput.value, loadedGame.currentRound, loadedGame.players, loadedGame.plays);
    } catch (e) {
      isLoadGameError.value = true;
      loadGameError.value = String(e);
    } 
  }

</script>

<template>
  <v-app>
    <v-main>
      <!--navbar-->
      <v-toolbar>
        <v-toolbar-title>Farkle</v-toolbar-title>
        <v-toolbar-items >
         <v-btn v-if="currentRound === 0" @click="loadGameModalOpen = true">Load Game</v-btn>
         <v-btn v-else @click="gameKeyModalOpen = true">View Game Code</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <!--Player Configuration View-->
      <v-container v-if="currentRound === 0">
        <player-selection />
      </v-container>
      
      <!--Game View-->
      <v-container v-else>
        <div v-if="currentRound > 1">
        <score-board />
          </div>
       <score-table />
      </v-container>

      <!--Load Game Modal-->
      <v-dialog
        v-model="loadGameModalOpen"
        max-width="1000"
        max-height="500"
      >
        <v-card>
        <v-card-title>
          <span class="text-h5">Load Game</span>
        </v-card-title>
        <v-card-text>
          
          <v-text-field
            label="Game Code"
            hide-details="auto"
            style="width: 15em"
            v-model="loadGameKeyInput"
          ></v-text-field>     
          
          <span 
            v-if="isLoadGameError"
            class="loadGameError"
          >
            {{loadGameError}}
          </span>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="handleLoadGameButtonClick"
            color="primary"
            :dark="true"
          >
            Load
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

      <!--Game Key Modal-->
      <v-dialog
        v-model="gameKeyModalOpen"
        max-width="1000"
        max-height="500"
      >
        <v-card>
        <v-card-title>
          <span class="text-h5">Game Key</span>
        </v-card-title>
        
        <v-card-text>
          {{gameKey}}  
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="gameKeyModalOpen = false"
            color="primary"
            :dark="true"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

    </v-main>
  </v-app>
</template>

<style scoped>
 .loadGameError {
    color: red;
 }
</style>
