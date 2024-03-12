import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import { BiTime } from 'react-icons/bi';
import { tableIcon } from '../../constants/appConstant';
import PlayPause from '../PlayPause';

const ListAlbumSong = ({dataAlbum}) => {
    // On déclare nos constantes
    const data = dataAlbum; // Infos de l'album
    const songs = dataAlbum?.songs; // Liste des titres
    // On déclare nos states
    const [isHover, setIsHover] = useState(-1); // Quand la souris sera une piste du tableau, state:tableau
    // On récupère les données du store
const { isPlaying, activeSong } = useSelector(state=>state.player); // selector:on déstructure les données
// On récupère les hooks
const dispatch = useDispatch();

// Méthode pour mettre en pause 
const handlePauseClick = () => {
    dispatch(playPause(false));
}

// Méthode pour mettre play
const handlePlayClick = (index) => {
dispatch(setActiveSong({songs, data, index}));
dispatch(setActiveAlbum({data}));
dispatch(playPause(true));
}


  return (
    <div className=' flex flex-col '>
        <div className='overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                <div className='overflow-hidden'>
                    <table className='min-w-full text-left text-sm font-light'>
                        <thead className='border-b font-medium'>
                            <tr>
                                <th scope='col' className='px-6 py-4'>#</th>
                                <th scope='col' className='px-6 py-4'>TITRE</th>
                                <th scope='col' className='px-6 py-4'> <BiTime style={tableIcon}/>
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {songs 
                            ? songs.map((row, index)=>{
                                // formatage du temps pour les titres
                                const minutes = Math.floor(row.duration / 60);
                                const seconds = Math.floor(row.duration % 60);
                                // Formatage du temps pour les titres mm:ss
                                const duration = seconds < 10 
                                ? `${minutes}:0${seconds}`
                                : `${minutes}:${seconds}`;

                                return (
                                    <tr 
                                    key={index}
                                    className='border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent'
                                    onMouseEnter={()=>setIsHover(index)}
                                    onMouseLeave={()=>setIsHover(-1)}
                                    >
                                        <td className='whitespace-nowrap px-6 py-4 font-medium'>
                                            {/* on va utiliser isHover pour afficher le bouton play */}
                                            {isHover !== index && `#${index+1}`}
                                            {isHover === index && <PlayPause 
                                            size='16px'
                                            songs={songs}
                                            handlePause={handlePauseClick}
                                            handlePlay={()=>handlePlayClick(index)}
                                            isPlaying={isPlaying}
                                            activeSong={activeSong}
                                            index={index}
                                            />}
                                        </td>
                                        <td className='whitespace-nowrap px-6 py-4 font-medium'>
                                            {row.title}
                                            </td>
                                            <td className='whitespace-nowrap px-6 py-4 font-medium'>
                                            {duration}
                                            </td>
                                    </tr>
                                )
                            })
                             : (
                                <tr>
                                    <td colSpan="3">Aucun titre pour cet album</td>
                                </tr>
                            )

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListAlbumSong