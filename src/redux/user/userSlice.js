import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const userSlice = createSlice({
    name: "user",
    initialState:{
        loading:false,
        userFavorite:[],
        user:{},
        avatars:[],

    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setUserFavorite:(state,action)=>{
            state.userFavorite = action.payload;
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setAvatars:(state,action)=>{
            state.avatars = action.payload
        }
    }
})

export const {setLoading, setUserFavorite, setUser, setAvatars} = userSlice.actions;

// Méthode qui récupère les albums favoris de l'utilisateur
export const fetchUserFavorite = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/users?page=1&id=${id}`);
    dispatch(setUserFavorite(response.data['hydra:member'][0].albums));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors du fetchUserFavorite: ${error}`);
        dispatch(setLoading(false));
    }


}

// Méthode qui récupère les informations de l'utilisateur
export const fetchUser = (id) => async dispatch => {
try {
   dispatch(setLoading(true)) ;
    const response = await axios.get(`${apiUrl}/users/${id}`);
    dispatch(setUser(response.data));
    dispatch(setLoading(false))
} catch (error) {
    console.log(`Erreur lors du fetchUser: ${error}`);
    dispatch(setLoading(false))
}
}

// Méthode qui récupère les avatars
export const fetchAvatars = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${apiUrl}/avatars?page=1&isActive=true`);
        dispatch(setAvatars(response.data['hydra:member']));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur lors du fetchAvatars: ${error}`);
        dispatch(setLoading(false));
        
    }
}

export default userSlice.reducer