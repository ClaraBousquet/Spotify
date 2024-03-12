import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbums } from '../../redux/album/albumSlice'
import { selectAlbumsData } from '../../redux/album/albumSelector'
import PageLoader from '../../components/Loader/PageLoader'
import { AiFillAlert } from "react-icons/ai";
import AlbumCard from '../../components/AlbumCard'

const Home = () => {
  //on récupère le hook useDispatch de react-redux
  const dispatch = useDispatch()

  // On doit récupérer les infos du slice player
  const { activeSong, isPlaying } = useSelector(state => state.player)


  useEffect(() => {
    dispatch(fetchAlbums()) //permet de mettre à jour les states albums et loading de albumSlice
  }, [dispatch])

  //on récupère notre selector pour avoir accès au données
  const { albums, loading } = useSelector(selectAlbumsData);
  const dataAlbum = albums['hydra:member']

  return (
    loading ? <PageLoader /> :
      <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
          Tous les albums
        </h2>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
          {/* on va devoir mapper dataAlbum pour parcourir chaque album */}
          {dataAlbum && dataAlbum.map((data, index)=>{
            return(
              <AlbumCard


              //on passe key en paramètre pour que chaque enfant soit unique
              key={index}
              //on lui passe data comme props de l'album
              data={data}
              // Songs: tableau de chanson
              songs={data.songs}
              // isPlaying: pour savoir si une chanson est en cours de lecture
              isPlaying={isPlaying}
              // activeSong: chanson en cours de lecture
              activeSong={activeSong}
              // index: index de la chanson dans le tableau de chanson
              index={0}
              />
            )
          })}
        </div>
      </div>
  )
}

export default Home