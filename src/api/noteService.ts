import axios from 'axios'
import Axios from 'axios'
import { INote } from '../models/intefaces'
const baseURL = 'http://localhost:3001/notes'

const getAll = async () : Promise<Array<INote>> => {
    let notes : Array<INote> = [];

    try{
        const { data } = await axios.get(baseURL);
        data.forEach((note : INote) => {
            notes.push(note)
        });
    }catch(error){
        console.error(error);
    }

    return notes
}


export {
    getAll
}