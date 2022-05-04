<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from 'vue'
import { useNoteServiceGetAll} from './composables/noteService';
import { INote } from './types';
import axios from 'axios';

export default {

   setup() {
      const {notes, error, isLoading, fetch} = useNoteServiceGetAll();

      fetch()

      return {notes, error, isLoading}
  }
}

</script>

<template>
  <div>
    <h1>Notes</h1>
      
        <ul v-for="note in notes" v-bind:key="note.id" >
          <li>{{note.content}}</li>
        </ul>
      
</div>
  
</template>

