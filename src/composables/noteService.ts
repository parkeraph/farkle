import { ref, Ref } from 'vue'
import { INote } from '../types'
import axios from 'axios';

const url: string = 'http://localhost:3001/notes'

const useNoteService = () => {
    const notes = ref<INote[]>([]);
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
            console.log(res);
        }catch(e){
            console.error(e);
            error.value = String(e);
        }finally{
            isLoading.value = false;
        }
    }

    return {
        notes,
        error,
        isLoading,
        getAllNotes,
        createNote
    }

} 

export {
    useNoteService
}