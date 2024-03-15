// On initialise le state dans une constante initialState

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentSongs: [], // Tableau vide pour stocker les chansons
    currentAlbum: [], // Objet vide pour stocker les infos d'un album
    currentIndex: 0, // Index de la chanson en cours de lecture
    isActive: false, // Etat du player
    isPlaying: false, // true= lecture false=pause
    activeSong: {}, // Chanson en cours de lecture
}

// Création du slice pour la gestion du player
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers:{
    // Tout ce qu'on stocke lorsqu'on active une chanson
    setActiveSong:(state, action) => {
        // stockage de la chanson en lecture dans activesong
    state.activeSong = action.payload?.songs[action.payload.index];
    // Stockage du tableau des chansons dans currentSongs
    state.currentSongs = action.payload?.data?.songs;
    // Stockage de l'index 
    state.currentIndex = action.payload?.index;
    // Stockage de l'état du player
    state.isActive = true;
    },

    setActiveAlbum: (state, action) => {
        // stockage de la chanson en lecture dans activesong
        state.currentAlbum = action.payload?.data;

    },

    // Pour avancer la liste de lecture
    nextSong: (state, action) => {
        // On récupère la chanson dans le tableau à l'index donné
        state.activeSong = state.currentSongs[action.payload];
        // On sotcke le nouvel index
        state.currentIndex = action.payload;
        state.isActive = true;
    },

    // Pour reculer la liste de lecture
    prevSong: (state, action) => {
        // On récupère la chanson dans le tableau à l'index donné
        state.activeSong = state.currentSongs[action.payload];
        // On sotcke le nouvel index
        state.currentIndex = action.payload;
        state.isActive = true;
    },

    playPause:(state, action) => {
        state.isPlaying = action.payload;

    },
    
  }
})

// export des actions
export const {setActiveSong, setActiveAlbum, nextSong, prevSong, playPause, } = playerSlice.actions;

// export du reducer
export default playerSlice.reducer;



