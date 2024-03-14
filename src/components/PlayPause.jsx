import React from 'react'
import { BsPlayCircleFill, BsPauseCircleFill, } from 'react-icons/bs'

const PlayPause = ({
    size = '60px', // Taille par défaut du bouton
    isPlaying, // true= lecture false=pause
    songs, // Tableau de chansons
    activeSong, // chanson jouée
    handlePause, // Fonction pour mettre pause
    handlePlay, // Lecture
    index // Index de la chanson dans le tableau

}) => {
  return (
    // On check si on est en play && si titre == le titre de la chanson du tableau à l'index donnée
isPlaying && activeSong?.title === songs[index]?.title ?
// si vrai: on retourne l'icone pause avec la méthode handlePause
<BsPauseCircleFill 
className='text-green shadow-md 'size={size} onClick={handlePause} />
:
<BsPlayCircleFill className='text-green shadow-md 'size={size} onClick={handlePlay} />
  )
}

export default PlayPause