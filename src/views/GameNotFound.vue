<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const router = useRouter();

    const goHome = () => {
        router.push({name: 'home'})
    }

</script>

<template>
    <v-container>
        <h1>Game not found!</h1>
        <v-btn @click="goHome">New Game</v-btn>
    </v-container>
</template>
