import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState:{
        loading:false,
        userFavorite:[],

    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setUserFavorite:(state,action)=>{
            state.userFavorite = action.payload;
        }
    }
})

export const {setLoading, setUserFavorite} = userSlice.actions;

export const fetchUserFavorite = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/users?page=1&id=${id}`);
        dispatch(setUserFavorite(response.data.albums));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors du fetchUserFavorite: ${error}`);
        dispatch(setLoading(false));
    }
}

export default userSlice.reducer