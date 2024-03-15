import React from 'react'
import { albumUrl } from '../../constants/apiConstant';
import { selectArtistData } from '../../redux/artist/artistSelector';
import { useSelector } from 'react-redux';

const Track = ({ isPlaying, isActive, activeSong, currentAlbum, artist = 'artiste inconnu' }) => {

  const { artistDetail } = useSelector(selectArtistData)
  //on déclare nos constantes
  //on récupère l'image de l'album
  const imgPath = `${albumUrl}/${currentAlbum?.imagePath}`;
  const title = activeSong?.title ?? 'Musique sans titre';
  const artistName = currentAlbum?.artist?.name
    ? currentAlbum?.artist?.name
    : artistDetail?.name
      ? artistDetail?.name
      : artist;

  const album = currentAlbum?.title ?? 'Album inconnu';


  return (
    <div className='flex flex-1 items-center justify-start'>
      {/* on affiche l'image de l'album */}
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={imgPath} alt={`image album ${album}`} className='rounded-full' />
      </div>
      <div className='w-[50%]'>
        <p className='truncate text-white font-bold text-lg'>
          {title}
        </p>
        <p className='truncate text-gray-500'>
          {artistName}
        </p>
      </div>
    </div>
  )
}

export default Track