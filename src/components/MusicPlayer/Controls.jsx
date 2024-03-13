import React from 'react'
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

const Controls = ({isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handleNextSong, handlePrevSong}) => {
  return (
    <div className='flex item-center justify-around md:w-36 lg:w-52 2xl:w-80'>
        {/*  On affiche le bouton repeat */}
        <BsArrowRepeat 
        size={20}
        color={repeat ? 'rgba(30, 215, 96, 1)' : '#fff'}
        className='cursor-pointer hidden sm:block'
        onClick={() => setRepeat((prev)=>!prev)}
        />
        {/*  On affiche le bouton précedent si on a des chansons dans le tableau */}
        {currentSongs.length >1 &&
        <MdSkipPrevious 
        size={30}
        color='#fff'
        className='cursor-pointer'
        onClick={handlePrevSong}
        />    
        }
        {/*  On affiche le bouton play/pause */}
        {isPlaying 
        ? (
            // On affiche le bouton pause
            <BsFillPauseFill
                size={45}
                color='#fff'
                className='cursor-pointer'
                onClick={handlePlayPause}
             />
        )
         : (
            // On affiche le bouton play
               <BsFillPlayFill
                size={45}
                color='#fff'
                className='cursor-pointer'
                onClick={handlePlayPause}
             />
         )
          }
             {/*  On affiche le bouton suivant si on a des chansons dans le tableau */}
        {currentSongs.length >1 &&
        <MdSkipNext 
        size={30}
        color='#fff'
        className='cursor-pointer'
        onClick={handleNextSong}
        />    
        }

           {/*  On affiche le bouton shuffle */}
        <BsShuffle
        size={20}
        color={shuffle ? 'rgba(30, 215, 96, 1)' : '#fff'}
        className='cursor-pointer hidden sm:block'
        onClick={() => setShuffle((prev)=>!prev)}
        />
    </div>
  )
}

export default Controls