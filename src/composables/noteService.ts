import { ref, Ref } from 'vue'
import { INote } from '../types'
import axios from 'axios';

const url: string = 'http://localhost:3001/notes'

interface IUseNoteServiceGetAllRefs {
    notes: Ref<INote[]>,
    error: Ref<unknown>,
    isLoading: Ref<Boolean>,
    fetch: Function
}

const useNoteServiceGetAll = () : IUseNoteServiceGetAllRefs => {
    const notes = ref<INote[]>([]);
    const error = ref<unknown>('');
    const isLoading = ref<boolean>(false);

    const fetch = async () => {
        isLoading.value = true;
        try{
            const resp = await axios.get(url);
            notes.value = resp.data;
        }catch(ex){
            error.value = ex;
        }finally{
            isLoading.value = false;
        }
    }
    
    return {
        notes,
        error,
        isLoading,
        fetch: fetch
    }

} 

const useNoteSevicePost = (newNote: INote) => {

}

export {
    IUseNoteServiceGetAllRefs,
    useNoteServiceGetAll,
    useNoteSevicePost
}