<script setup lang="ts">
  import useFarkleState from './composables/useFarkleState';
  import { getGame, getAppBaseRoute } from './api';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import QRCode from 'qrcode';

  const { currentRound, gameKey, loadGame, startScoreboardMode, scoreboardMode } = useFarkleState();
  const router = useRouter();

  const loadGameModalOpen = ref<boolean>(false);
  const loadGameKeyInput = ref<string>('');
  const loadGameError = ref<string>('');
  const isLoadGameError = ref<boolean>(false);
  const gameOptionsModalOpen = ref<boolean>(false);
  const showGameQRCodeCanvas = ref<boolean>(false);

  watch(scoreboardMode, (newState, oldState) => {
    if(newState) { 
      router.push({name: 'scoreboard'}) 
      gameOptionsModalOpen.value = false;
    }
  });

  const handleLoadGameButtonClick = async () => {
    //if getGame does not throw an error, then load it on game route
    try {
      await getGame(loadGameKeyInput.value);
      loadGameModalOpen.value = false;
      router.push(`/game/${loadGameKeyInput.value}`)
    } catch (e) {
      isLoadGameError.value = true;
      loadGameError.value = String(e);
    }
  }

  const goHome = () => {
    router.push({name: 'home'});
  }

  const handleScoreboardModeClicked = async () => {

      const canvas = document.getElementById("qrCanvas");
      showGameQRCodeCanvas.value = true;
      startScoreboardMode();
      QRCode.toCanvas(canvas, getAppBaseRoute()+`/game/${gameKey.value}`)
    
  }

</script>

<template>
  <v-app>
    <v-main>
      
      <!--navbar-->
      <v-toolbar>
        <v-toolbar-title @click="goHome">Farkle</v-toolbar-title>
        <v-toolbar-items >
         <v-btn v-if="currentRound === 0" @click="loadGameModalOpen = true">Load Game</v-btn>
         <v-btn v-else @click="gameOptionsModalOpen = true">Game Options</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <div class="viewContainer">
        <router-view/>
      </div>

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

      <!--Game Options Modal-->
      <v-dialog
        v-model="gameOptionsModalOpen"
        max-width="1000"
        max-height="500"
      >
        <v-card>
        <v-card-title>
          <span class="text-h5">Game Options</span>
        </v-card-title>
        
          <v-card-text>
            Game Key: {{gameKey}}  
          </v-card-text>

          <div class="modalContent">
            <v-btn 
              @click="handleScoreboardModeClicked"
              style="margin: 1em 2em 0em 2em"
            >
              ScoreBoard Mode
            </v-btn>

            <canvas v-show="showGameQRCodeCanvas" id="qrCanvas">

            </canvas>

            <v-btn 
              @click="goHome" 
              style="margin: 1em 2em 1em 2em"
            >
              Exit Game
            </v-btn>
          </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="gameOptionsModalOpen = false"
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
 .viewContainer {
  margin-top: 1em
 }

.modalContent {
  display: flex;
  flex-direction: column;
}

#qrCanvas {
  margin: 0 auto 0 auto;
}

</style>
