import { readonly, ref, computed } from 'vue'
import { INote } from '../types'
import axios from 'axios';

const url: string = 'http://localhost:3001/notes'
const notes = ref<INote[]>([]);

const useNoteService = () => {

    const error = ref<String>('');
    const isLoading = ref<boolean>(false);

    const getAllNotes = async () => {
        isLoading.value = true;
        try{
            const resp = await axios.get<INote[]>(url);
            notes.value = resp.data;
        }catch(ex){
            error.value = String(ex);
        }finally{
            isLoading.value = false;
        }
    }

    const createNote = async (newNote: INote) => {
        isLoading.value = true;
        try{
            const res = await axios.post(url, newNote);
        }catch(e){
            error.value = String(e);
        }finally{
            isLoading.value = false;
        }
    }

    const updateNote = async (updatedNote: INote) => {
        isLoading.value = true;

        try{
            await axios.put(`${url}/${updatedNote.id}/`, updatedNote);
            const resp = await axios.get<INote[]>(url);
            notes.value = resp.data;
        }catch(e){
            error.value = String(e)
        }finally{
           
            isLoading.value = false;
        }
    }

    const importantNotes : INote[] = computed(() => 
                notes.value.filter(element => element.important)
            )

    return {
        notes:readonly(notes),
        importantNotes,
        error,
        isLoading,
        getAllNotes,
        createNote,
        updateNote
    }

} 

export {
    useNoteService
}