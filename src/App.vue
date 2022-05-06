<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from 'vue'
import { useNoteService } from './composables/noteService';
import { INote } from './types';
import { getAll } from './api/noteService';

export default {

   setup() {
     const newNoteContent = ref('');

      const { notes, error, isLoading, getAllNotes, createNote} = useNoteService();

      getAllNotes();

      const handleNewNoteClick = async () => {
        
        let newNote : INote = {
          content: newNoteContent.value,
          date: String(Date.now()),
          important: false,
          id: ""
        }

        await createNote(newNote);
        await getAllNotes();

        newNoteContent.value = "";
      }

      return {notes, error, isLoading, handleNewNoteClick, newNoteContent}
  }
}

</script>

<template>
  <div class="app-wrapper">

    <h1 class="text-3xl mt-3">Notes</h1>
      
    <ul v-for="note in notes" v-bind:key="note.id" class="note-list" >
      <li class="note-item">{{note.content}}</li>
    </ul>  

    <div class="new-note-form">
        <input 
            class="mb-1 "
            v-model="newNoteContent"
            placeholder="...enter new note"
        />
        <button 
          class="mb-1" 
          @click="handleNewNoteClick"
        >save</button>
    </div>

  </div> 
</template>

<style lang="postcss">
  .app-wrapper {
    @apply flex flex-col justify-center items-center
  }

 .note-list {
   @apply bg-white rounded-lg border border-gray-200  w-5/6 xl:w-1/3 lg:w-1/2 md:w-3/4  text-gray-900 mt-1
 }

 .note-item {
   @apply px-4 py-2 border-b border-gray-200 w-full flex justify-between
 }

 .new-note-form {
   @apply mt-5 px-2 border-b border-gray-400
 }
</style>