import axios from "axios"
import { apiUrl } from "../constants/apiConstant";

export const checkUser = async (userInfo) => {
    try {
        // On récupère l'utilisateur dans la base de données avec l'id en session
        const response = await axios.get(`${apiUrl}/users/${userInfo.userId}`);
        const user = response.data;
        // Maintenant On compare les données de la BDD avec celles en session
        if(user.email === userInfo.email && user.nickname === userInfo.nickname){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(`erreur lors du checkUser : ${error}`);
        return false;
    }
}