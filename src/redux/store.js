import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
  // Ajouter les futurs reducers ici
  albums: albumReducer,
  player: playerReducer,
  user: userReducer,
  }
})

export default store