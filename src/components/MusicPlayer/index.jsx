import React, { useEffect, useState } from 'react'
import Track from './Track'
import { useDispatch, useSelector } from 'react-redux'
import Controls from './Controls';
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice';
import VolumeBar from './VolumeBar';
import SeekBar from './SeekBar';
import Player from './Player';


const MusicPlayer = () => {
// ---On récupère toutes les données du slice player---

    const  {activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying} = useSelector((state )=> state.player);

// ---On déclare nos states---
    const [shuffle, setShuffle] = useState(false) // état pour le mode aléatoire
    const [repeat, setRepeat] = useState(false) // Etat pour le mode repetition
    const [volume, setVolume] = useState(0.3) // Etat pour le volume
    const [duration, setDuration] = useState(0) // Duree de la chanson
    const [seekTime, setSeekTime] = useState(0) // Position de la barre de lecture
    const [appTime, setAppTime] = useState(0) // Position de la lecture de la chanson



// ---On récupère les hooks---
const dispatch = useDispatch();

useEffect(() => {
    // Si le store contient un tableau de chansons, on dispatch playPause à true
    if(currentSongs.length)dispatch(playPause(true));
}, [currentIndex]) // Si currentIndex change => On reload le composant


// ---On crée nos méthodes---

// Méthode pour gérer l'état de play/pause
const handlePlayPause = () => {
    // Si aucune chanson active on return
    if(!isActive) return;

    // Si une chanson est active
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
}

// Méthode pour reculer d'une chanson
const handlePrevSong = () => {
if(currentIndex === 0){
    //si l'index est à zéro on récupère le dernier index du tableau
    dispatch(prevSong(currentSongs.length - 1));
}else if (shuffle){
// Si one st en mode aléatoire
    dispatch(prevSong(Math.floor(Math.random() * currentSongs.length  )));
}else{
// sinon on recule d'une chanson
    dispatch(prevSong(currentIndex - 1));
}
}

// Méthode pour avancer d'une chanson
const handleNextSong = () => {
    // Si on est pas en mode aléatoire
    if(!shuffle){
        dispatch(nextSong((currentIndex + 1) % currentSongs.length)); // pour parcourir le tableau sans sortir du tableau
    }else{
        dispatch(nextSong(Math.floor(Math.random() * currentSongs.length )));
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
                isPlaying={isPlaying} // Savoir si le titre est en cours de lecture
                isActive={isActive} // Savoir si une chanson est active
                currentSongs={currentSongs}// Tableau de chansons
                handlePlayPause={handlePlayPause}// Methode pour gérer l'état de play/pause
                handleNextSong={handleNextSong}// Methode pour avancer d'une chanson
                handlePrevSong={handlePrevSong}// Methode pour reculer d'une chanson
                repeat={repeat}// Etat pour le mode repetition
                setRepeat={setRepeat}// Setter pour changer le mode repetition
                shuffle={shuffle}// Etat pour le mode aléatoire
                setShuffle={setShuffle}// Setter pour changer le mode aléatoire
             />
             <SeekBar 
             value={appTime} // valeur actuelle de la lecture
             min={0}
             max={duration}// Duree de la chanson
             onInput={(event) => setSeekTime(event.target.value)} // On change la valeur de la barre de lecture
             setSeekTime={setSeekTime} // Setter pour changer la valeur
             appTime={appTime} // valeur actuelle de la lecture
             />
             <Player 
             activeSong={activeSong} // Chanson en cours de lecture
             volume={volume} // Volume
             isPlaying={isPlaying} // Savoir si le titre est en cours de lecture
             seekTime={seekTime} // Position de la barre de lecture
             repeat={repeat} // Etat pour le mode repetition
             currentIndex={currentIndex} // Index de la chanson en cours de lecture
             onEnded={handleNextSong} // Si la chanson est finie, on avance d'une chanson
             onTimeUpdate={(event) => setAppTime(event.target.currentTime)} // On change la valeur de la lecture
             onLoadedData={(event) => setDuration(event.target.duration)} // On change la valeur de la duree, mémoire data
             
             />

         </div>
         <VolumeBar
         value={volume}
         min={0}
         max={1}
        onChange={(e) => setVolume(Number(e.target.value))}
        setVolume={setVolume}
         />
    </div>
  )
}

export default MusicPlayer