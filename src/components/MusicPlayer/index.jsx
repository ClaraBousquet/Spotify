import React, { useEffect, useState } from 'react'
import Track from './Track'
import { useSelector, useDispatch } from 'react-redux'
import Controls from './Controls';
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice';
import VolumeBar from './VolumeBar';
import SeekBar from './SeekBar';
import Player from './Player';

const MusicPlayer = () => {
  //on récupère toutes les données du slice player
  const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  //on déclare nos states
  const [shuffle, setShuffle] = useState(false) //état pour le mode aléatoire
  const [repeat, setRepeat] = useState(false) //état pour le mode répétition
  const [volume, setVolume] = useState(0.3) //état pour le volume
  const [duration, setDuration] = useState(0) //durée de la chanson
  const [seekTime, setSeekTime] = useState(0) //recuperer la position de la barre (si on deplace le curseur manuellement)
  const [appTime, setAppTime] = useState(0) //temps actuel de la chanson

  //on récupère les hooks
  const dispatch = useDispatch();

  useEffect(() => {
    //si le store contient un tableau de chansons on dispatch playPause à true
    if (currentSongs.length) dispatch(playPause(true))
  }, [currentIndex]) //si currentIndex change => on reload le composant


  //on crée nos méthodes
  //méthode pour gérer l'état de play/pause
  const handlePlayPause = () => {
    //si aucune chanson active on return
    if (!isActive) return;

    //si une chanson est active
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
  }

  //méthode pour avancer à la chanson suivante
  const handleNextSong = () => {
    //si on est pas en mode aléatoire
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length))
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
    }
  }

  //méthode pour reculer à la chanson précédente
  const handlePrevSong = () => {
    if (currentIndex === 0) {
      //si l'index est a 0 on récupère le dernier index du tableau
      dispatch(prevSong(currentSongs.length - 1))
    } else if (shuffle) {
      //si on est en mode aleatoire
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
    } else {
      //sinon on recule de 1
      dispatch(prevSong(currentIndex - 1))
    }
  }

  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
      />
      <div className='flex flex-1 flex-col items-center justify-center'>
        <Controls
          isPlaying={isPlaying}// savoir si le titre est en cours de lecture
          isActive={isActive} //savoir si une musique est active
          currentSongs={currentSongs} //tableau de chanson
          handlePlayPause={handlePlayPause} //pour changer l'etat de play/pause
          handlePrevSong={handlePrevSong} //pour changer de chanson précédente
          handleNextSong={handleNextSong} //pour changer de chanson suivante
          repeat={repeat} //pour savoir si on est en mode répétition
          setRepeat={setRepeat} //pour changer l'état de répétition
          shuffle={shuffle} //pour savoir si on est en mode aléatoire
          setShuffle={setShuffle} //pour changer l'état de aléatoire
        />
        <SeekBar
          value={appTime} //valeur actuelle de la lecture
          min="0" //valeur minimum
          max={duration} //valeur maximum (temps de la musique)
          onInput={(event) => setSeekTime(event.target.value)} //pour recuperer la position de la barre de lecture
          setSeekTime={setSeekTime} //pour changer la position de la barre de lecture
          appTime={appTime} //pour récupérer la position reel de lecture
        />
        <Player 
          activeSong={activeSong} //pour recuperer la chanson active
          volume={volume} //pour recuperer le volume
          isPlaying={isPlaying} //pour savoir si le titre est en cours de lecture
          seekTime={seekTime} //pour recuperer la position de la barre de lecture
          repeat={repeat} //pour savoir si on est en mode répétition
          currentIndex={currentIndex} //pour recuperer l'index de la chanson
          onEnded={handleNextSong} //pour changer de chanson suivante
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)} //pour recuperer le temps actuel de la chanson
          onLoadedData={(event) => setDuration(event.target.duration)} //pour recuperer la durée de la chanson
        />
      </div>
      <VolumeBar
        value={volume} //valeur reel du volume
        min="0" //valeur minimum
        max="1" //valeur maximum
        onChange={(event) => setVolume(event.target.value)} //pour recuperer la position de la barre de volume
        setVolume={setVolume} //pour changer le volume
      />
    </div>
  )
}

export default MusicPlayer