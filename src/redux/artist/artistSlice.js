import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";


const artistSlice = createSlice({
    name:'artists',

    initialState: {
    loading: false,
    artistDetail:{},
    },
        

    reducers: {
        
    setLoading: (state, action)=>{
        state.loading = action.payload
    },
    setArtistDetail: (state, action)=>{
        state.artistDetail = action.payload['hydra:member'][0]; // hydra member parce que sur api platform on rentre dans une collection , l'id fait partie de la collection dans hydra member
    }
    }
    });

    export const {setLoading, setArtistDetail} = artistSlice.actions;


// Méthode pour récupérer les artistes de la BDD
export const fetchArtistDetail = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/artists?id=${id}&albums.isActive=true`);
        dispatch(setArtistDetail(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchArtistDetail: ${error}`);
        dispatch(setLoading(false));
    }
}


// export du reducer
export default artistSlice.reducer;