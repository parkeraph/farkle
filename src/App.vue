<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { watch, ref, onMounted } from 'vue'
import { useNoteService } from './composables';
import { INote } from './types';
import { Note } from './components';

export default {
    setup() {
        const newNoteContent = ref("");
        const importantOnly = ref(false);
        const { notes, importantNotes, error, isLoading, getAllNotes, createNote } = useNoteService();

        onMounted(() => {
          getAllNotes();
        });

        const handleNewNoteClick = async () => {
            let newNote: INote = {
                content: newNoteContent.value,
                date: String(Date.now()),
                important: false,
                id: ""
            };
            await createNote(newNote);
            await getAllNotes();
            newNoteContent.value = "";
        };
        const toggleImportantView = async () => {
            importantOnly.value = !importantOnly.value;
        };

        return {
            notes,
            importantNotes,
            importantOnly,
            error,
            isLoading,
            handleNewNoteClick,
            newNoteContent,
            toggleImportantView
        };
    },
    components: { Note }
}

</script>

<template>
  <div class="app-wrapper">

    <h1 class="text-3xl mt-3">Notes</h1>
    <div class="content-wrapper">
      <button 
        class="important-button" 
        @click="toggleImportantView">
          {{importantOnly ? "Show All" : "Show Important"}}
      </button>  

      <div v-if="importantOnly">
        <ul v-for="note in importantNotes" v-bind:key="note.id" class="note-list" >
          <Note :note="note" />
        </ul>
      </div> 
      <div v-else>
        <ul v-for="note in notes" v-bind:key="note.id" class="note-list" >
         <Note :note="note" />
        </ul> 
      </div>
      
    </div>
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
   @apply bg-white rounded-lg border border-gray-200 text-gray-900 mt-1
 }


 .new-note-form {
   @apply mt-5 px-2 border-b border-gray-400 
 }

 .important-button {
    @apply rounded-lg border border-gray-200 p-2 bg-slate-300
 }

 .content-wrapper {
    @apply w-full w-5/6 xl:w-1/3 lg:w-1/2 md:w-2/3
 }
</style>