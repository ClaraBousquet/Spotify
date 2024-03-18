import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAvatars } from '../../../redux/user/userSlice';
import { selectUserData } from '../../../redux/user/userSelector';
import PageLoader from '../../../components/Loader/PageLoader';
import { apiUrl, avatarUrl } from '../../../constants/apiConstant';
import axios from 'axios';

const AvatarList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // On récupère l'id de l'utilisateur
    const {userId} = useAuthContext();

    useEffect(()=> {
        dispatch(fetchAvatars())
    }, [])

    const {loading, avatars} = useSelector(selectUserData);
    const handleClick = (avatarId) => {
    const data = {
        avatar: `/api/avatars/${avatarId}`
    }

    // Configuration de la méthode patch.axios
        axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json'; // pour utiliser méthode patch avec axios
        axios.patch(`${apiUrl}/users/${userId}`, data).then((res) => {
            if(res.status===200){
                navigate(`/account/${userId}`)
            }
        }).catch((error)=>{
            console.log(`Erreur lors du fetchAddRemoveFavorite : ${error}`);
        })

}

  return (
    loading ? <PageLoader /> :

    <>
        <h2 className='text-3xl text-white font-bold text-center pt-6'>Choisissez un nouvel avatar !</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-5 m-10'>
            {avatars && avatars.map((avatar)=>(
                <div
                key={avatar.id}
                className='w-30 h-30 cursor-pointer'
                onClick={()=>{handleClick(avatar.id)}}
                >
                    <img src={`${avatarUrl}/${avatar.imagePath}`} alt="avatar profil" className='w-full h-full rounded-full object-contain' />
                </div>
            ))}

        </div>
    </>

  )
}

export default AvatarList