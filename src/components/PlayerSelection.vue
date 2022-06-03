<script setup lang="ts">
    import { ref } from 'vue';
    import useFarkleState from '../composables/useFarkleState';
import IPlayer from '../types/player';
    
    const { players, addPlayers, startGame } = useFarkleState();

    const playerInputs = ref<IPlayer[]>([{playerId: 0, name: ''}]);
    
    const handlePlayerNameChanged = (inputOrd: number, newNameValue?: string) => {
        const newName  = newNameValue ? newNameValue : "";
        playerInputs.value[inputOrd].name = newName;
    }

    const handleAddPlayerInput = () => {
        playerInputs.value.push({playerId: playerInputs.value.length, name: ''});
    }

    const handleStartGame = () => {
        addPlayers(playerInputs.value);
        startGame();
    }

</script>

<template>
    <v-card
    class="player-selection-card"
    elevation="4"
    >
        <div class="card-header">
            <v-card-title>Player Setup</v-card-title>
            <div class="header-action">
                <v-btn @click="handleAddPlayerInput">Add Player</v-btn>
               
            </div>
        </div>
        <div class="card-content">
            <div v-for="inputs in playerInputs" :key="inputs.playerId" class="player-card">
               <div class="player-card-label">
                   Player {{inputs.playerId + 1}}:
               </div>
               <div class="player-card-input">
                    <input @input="event => handlePlayerNameChanged(inputs.playerId, event.target.value)" class="player-card-input-text" type="text" >
                </div>
            </div>
        
        </div>
        <div class="card-footer">
            <v-btn color="primary" @click="handleStartGame">Start Game</v-btn>
        </div>
    </v-card>
</template>

<style scoped>
    .player-selection-card {
        padding: 1em;
        width: 75%;
        margin: auto auto
    }

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        border-bottom-style: solid;
        border-bottom-width: .1em;
        border-block-color: grey;
    }

    .player-card {
        display: flex;
        flex-direction: row;
        justify-content:center;
        padding-top: 1em;
    }

    .player-card-label {
        font-size: large; 
        margin-right: 1em;
        margin-top: 3px;
    }

    .player-card-input {
        width: 50%;
    }

    .player-card-input-text {
        border: solid;
        border-width: 1px;
        border-radius: 5px;
        padding: 3px;
    }

    .card-footer {
        display: flex;
        justify-content: right;
        margin-top: 1em;
    }

    @media (max-width: 750px){
        .player-selection-card {
            padding: 1em;
            width: 100%;
            margin: auto auto
        }
        .player-card-label {
            font-size:large; 
            margin-right: 1em
        }
    }

    @media (max-width: 400px) {
        .player-card-input-text {
            width: 120%
        }

    }
</style>
