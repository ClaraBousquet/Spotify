import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavorite } from '../../redux/user/userSlice';
import { useAuthContext } from '../../contexts/AuthContext';
import { selectUserData } from '../../redux/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/AlbumCard';

const Library = () => {

// 1er: on récupère le hook useDispatch pour éxécuter des requêtes du slice
const dispatch = useDispatch();

// on récupère l'id de l'utilisateur pour le fetchUserFavorite
const {userId} = useAuthContext();

// On récupère les infos du slice player
const { isPlaying, activeSong } = useSelector(state => state.player)

//  useEffect 
useEffect(()=> {
  dispatch(fetchUserFavorite(userId));
}, [])

// selector récupère les states du slice
const {userFavorite, loading} = useSelector(selectUserData);


  return (
    loading ? <PageLoader /> :
    userFavorite && userFavorite.length > 0 ? 
      <>
      <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Mes albums favoris</h2>
     <div className='flex flex-wrap'>
      {userFavorite.map((data, index)=>(
        <div key={index} className='m-3'>
        <AlbumCard
        data={data}
              songs={data?.songs}
              index={0}
              isPlaying={isPlaying}
              activeSong={activeSong}
              />

        </div>
      ))}

     </div>
     
      </>
      : <h2>Aucun album favoris</h2>

  )
}

export default Library