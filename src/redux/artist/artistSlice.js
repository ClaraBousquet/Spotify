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
        state.artistDetail = action.payload
    }
    }
    });

    export const {setLoading, setArtistDetail} = artistSlice.actions;


// Méthode pour récupérer les artistes de la BDD
export const fetchArtists = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/artists?page=1&id=${id}&albums.isActive=true`);
        dispatch(setArtistDetail(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
    }
}


// export du reducer

export default artistSlice.reducer;