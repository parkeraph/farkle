<script setup lang="ts">
  import PlayerSelection from './components/PlayerSelection.vue';
  import ScoreTable from './components/ScoreTable.vue';
  import useFarkleState from './composables/useFarkleState';
  import ScoreBoard from './components/ScoreBoard.vue';

  const { currentRound } = useFarkleState();

</script>

<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title>Farkle</v-toolbar-title>
        <v-toolbar-items >
          <v-btn>Load Game</v-btn>
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
    </v-main>
  </v-app>
</template>
