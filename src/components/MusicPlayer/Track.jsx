import React from 'react'
import { albumUrl } from '../../constants/apiConstant'

const Track = ({isPlaying, isActive, activeSong, currentAlbum}) => {
    // On déclare nos constantes
    // on récupère l'image de l'album

    const imgPath = `${albumUrl}/${currentAlbum?.imagePath}`;
    const title = activeSong?.title ?? 'Musique sans titre !';
    const artist = currentAlbum?.artist?.name ?? 'artiste inconnu, carrière râtée';
    const album = currentAlbum?.title ?? 'album inconnu';

  return (
    <div className='flex flex-1 items-center justify-start'>
        {/*  On affichee l'image de l'album */}
        <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={imgPath} alt={`image album ${album}`} className='rounded-full' />

        </div>
        <div className='width-[50%]'>
            <p className='truncate text-white font-bold text-lg'>
                {title}
            </p>
            <p className='truncate text-gray-500'>
                {artist}

            </p>

        </div>
    </div>
  )
}

export default Track