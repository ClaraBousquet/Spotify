import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const albumSlice = createSlice({
  //on lui donne un nom
  name: 'albums',
  //on doit initialiser les states (les valeurs par defaut)
  initialState: {
    albums : [], //on initialise un tableau vide pour stocker la futur liste d'albums
    loading: false,// on initialise le state loading à false pour pouvoir gérer l'attente des requetes asynchrone
    albumDetail: {},
    searchAlbum : [],
    searchArtist: [],
    searchTitle: [],
  },
  //methode qui permet de remplir les states (mise en rayon)
  reducers: {
    setAlbums: (state, action)=>{
      state.albums = action.payload
    },
    setLoading: (state, action)=>{
      state.loading = action.payload
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload
    },
    setSearchAlbum:(state, action)=>{
      state.searchAlbum = action.payload
    },
    setSearchArtist:(state, action)=>{
      state.searchArtist = action.payload
    },
    setSearchTitle:(state, action)=>{
      state.searchTitle = action.payload
    }
  }
});

export const { setAlbums, setLoading, setAlbumDetail, setSearchAlbum, setSearchArtist, setSearchTitle } = albumSlice.actions;

//on crée la méthode qui permet de récupérer les données des albums de la BDD
export const fetchAlbums = () => async dispatch => {
  try {
    //on passe le state loading à true pour signifier qu'on attend une réponse
    dispatch(setLoading(true));

    const response = await axios.get(`${apiUrl}/alba?page=1&isActive=true`);
    //on set les données dans le state albums
    dispatch(setAlbums(response.data));
    //on repasse le state loading a false pour signifier qu'on a fini d'attendre
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur sur fetchAlbums: ${error}`);
    dispatch(setLoading(false));
  }
};

//on crée la méthode pour récupérer les infos d'un album particulier
export const fetchAlbumDetail = (id) => async dispatch => {
  try {
    //on passe le state loading à true pour signifier qu'on attend une réponse
    dispatch(setLoading(true));

    const response = await axios.get(`${apiUrl}/alba?page=1&id=${id}&isActive=true`);
    //on set les données dans le state albums
    dispatch(setAlbumDetail(response.data['hydra:member'][0]));
    //on repasse le state loading a false pour signifier qu'on a fini d'attendre
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur sur fetchAlbumDetail: ${error}`);
    dispatch(setLoading(false));
  }
}

//on crée la méthode pour faire une rechercher d'album
export const fetchSearch = (searchWord) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const responseAlbums = await axios.get(`${apiUrl}/alba?page=1&title=${searchWord}&isActive=true`);
    const responseArtist = await axios.get(`${apiUrl}/artists?page=1&name=${searchWord}&albums.isActive=true`);
    const responseTitle = await axios.get(`${apiUrl}/alba?page=1&songs.title=${searchWord}&isActive=true`);

    dispatch(setSearchAlbum(responseAlbums.data))
    dispatch(setSearchArtist(responseArtist.data))
    dispatch(setSearchTitle(responseTitle.data))

    dispatch(setLoading(false));
    
  } catch (error) {
    console.log(`Erreur sur fetchSearch: ${error}`);
    dispatch(setLoading(false));
  }
}

//on une méthode pour reset la recherche
export const fetchResetSearch = () => async dispatch => {
  dispatch(setSearchAlbum([]));
  dispatch(setSearchArtist([]));
}

// On exporte notre reducer
export default albumSlice.reducer;