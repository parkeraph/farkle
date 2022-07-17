import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, Database, get, child, set, push, onValue, update } from "firebase/database";
import IPlay from '../types/play';
import IPlayer from '../types/player';
import useFarkleState from '../composables/useFarkleState'

let app : FirebaseApp ;
let database : Database ;

const getFirebaseApp = async () => {
    
    if(app == null) {
        
        if(import.meta.env.PROD){
            const response = await fetch('/__/firebase/init.json')
            console.log(response)
            app = initializeApp(await response.json()); 
        } else {
            const firebaseConfig = {
                    apiKey: import.meta.env.FB_API_KEY,
                    authDomain: import.meta.env.FB_AUTH_DOMAIN,
                    databaseURL: import.meta.env.FB_DATABASE_URL,
                    projectId: import.meta.env.FB_PROJECT_ID,
                    storageBucket: import.meta.env.FB_STORAGE_BUCKET,
                    messagingSenderId: import.meta.env.FB_MESSAGING_SENDER_ID,
                    appId: import.meta.env.FB_APP_ID
            };
        
            app = initializeApp(firebaseConfig);
        }
    }

    return app;
}

const getRealtimeDatabase = async () => {
    
    if(database == null){
        // Get a reference to the database service
        database = getDatabase(await getFirebaseApp());
    }

    return database;     
}

const getGame = async (gameKey: string) => {
    
    try {
        const dbRef = ref(await getRealtimeDatabase());
        const snapshot = await get(child(dbRef, `games/${gameKey}`));

        if(snapshot.exists()){
            return snapshot.val();
        }else{
           throw "Game does not exist"
        }

    } catch (e){
        console.error(e)
        throw e
    }
}

const createNewGame = async (newPlayers: IPlayer[] ) => {
    
    try { 
        const databaseRef = ref(await getRealtimeDatabase(), 'games');
        const newPostRef = push(databaseRef);
        const placeholderPlays = newPlayers.map((player) => { return {"roundNumber": 0, "playerId": player.playerId, "points": 0}})

        set(newPostRef, {
            currentRound: 1,
            players: newPlayers,
            plays: placeholderPlays,
            acceptingController: false
        });

        return newPostRef.key;
    } catch (e) {
        throw e;
    }
}

const updateGame = async (gameKey: string,  newCurrentRound: number, newPlayers: IPlayer[], newPlays: IPlay[]) => {
    try {
        const gameRef = ref(await getRealtimeDatabase(), `games/${gameKey}`);

        const updates = {
            '/currentRound/': newCurrentRound,
            '/players/': newPlayers,
            '/plays/': newPlays
        }

        update(gameRef, updates)

    } catch (e) {
        throw e
    }
}

const updateGameAcceptingControllerState = async (gameKey: string, newValue: boolean) => {
    try {
        const gameRef = ref(await getRealtimeDatabase(), `games/${gameKey}`);

        const updates = {
            '/acceptingController/': newValue
        };

        await update(gameRef, updates)

    } catch (e) {
        throw e
    }
}


const listenForControllerConnect = async (gameKey: string) => {
    try {
        
        const gameAcceptingControllerRef = ref(await getRealtimeDatabase(), `games/${gameKey}/acceptingController`);

        onValue(gameAcceptingControllerRef, (snapshot) => {
            const data = snapshot.val();
            console.log("sdfa", data);
            return data
        });

    } catch (e) {
        throw e
    }
}

const getGameAcceptingControllerState = async (gameKey: string) => {
    try {
        const dbRef = ref(await getRealtimeDatabase(), `games/${gameKey}/acceptingController`);
        const snapshot = await get(dbRef);

        if(snapshot.exists()){
            return snapshot.val();
        }

    } catch (e){
        console.error(e)
        throw e
    }
}

//TODO: remove url hardcodings
const getAppBaseRoute = () => {
    if(import.meta.env.PROD){
      return 'https://farkle-248b4.web.app';
    } else {
       return 'http://192.168.0.86:3000/'
    }
}


export { 
    getRealtimeDatabase,
    getGame,
    createNewGame,
    updateGame,
    getAppBaseRoute,
    listenForControllerConnect, 
    updateGameAcceptingControllerState,
    getGameAcceptingControllerState
}