import React from 'react'
import Track from './Track'
import { useSelector } from 'react-redux'

const MusicPlayer = () => {
// on récupère toutes les données du slice player

    const  {activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying} = useSelector((state )=> state.player);


  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'> 
        <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
         />
    </div>
  )
}

export default MusicPlayer