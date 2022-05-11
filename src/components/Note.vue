<script setup lang="ts">
    import { INote } from "../types"
    import { useNoteService } from "../composables"
        
    const { note } = defineProps<{
                                    note: INote
                                }>();

    const { updateNote } = useNoteService();

    const handleImportanceButtonClick = () => {
        const updatedNote = { ...note, important: !note.important }
        updateNote(updatedNote);
        
    }

</script>

<template>
    <li class="note-item">
        {{note?.content}}
        <button @click="handleImportanceButtonClick">
            <i v-if="(note?.important)" class="fas fa-heart"></i>
            <i v-else class="far fa-heart"></i>
        </button>
    </li>
</template>

<style lang="postcss">
    .note-item {
        @apply p-5 px-4 py-2 border-b border-gray-200 w-full flex justify-between 
    }
</style>