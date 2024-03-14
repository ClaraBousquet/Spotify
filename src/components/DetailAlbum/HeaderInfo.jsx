import React, { useEffect, useState } from 'react'
import { albumUrl, artistUrl } from '../../constants/apiConstant'
import PageLoader from '../Loader/PageLoader'
import { Link } from 'react-router-dom'

const HeaderInfo = ({dataAlbum}) => {

    const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
    setIsLoading(false)
},[])

// On récupère la photo d'artiste si elle existe sinon photo album

const imgPath = dataAlbum?.artist?.imagePath ? 
`${artistUrl}/${dataAlbum?.artist?.imagePath}` 
: `${albumUrl}/${dataAlbum?.imagePath}`

// On formate la date de sortie (on ne récupère que l'année)
const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear() ?? 'date inconnue'

// On définit le nombre de titre par album
const nbTitle = dataAlbum.songs ? dataAlbum?.songs.length > 1 
? dataAlbum?.songs.length + ' titres'
: dataAlbum?.songs.length + ' titre'
: 'Aucun titre pour cet album'

// petit élément graphique pour faire un point
const Dot = () => (
    <p>&#8226;</p>
)

// Traitement de la durée de l'album

const durationAlbum = () => {
    // On va calculer le nombre de secondes pour tous les titres
    const totalSeconds = dataAlbum?.songs && dataAlbum?.songs.map(function(num){
        return parseInt(num.duration)
    }).reduce(function(a,b){
        return a+b
    });

    // On va formater les secondes en heure, en minutes et en secondes
    const hours = Math.floor(totalSeconds/3600);
    const minutes = Math.floor((totalSeconds % 3600)/ 60);
    const seconds = totalSeconds % 60;

    // On va retourner une string sous la forme 1h 15min 30s
    return hours > 0 
    ? `${hours} h ${minutes} min ${seconds} s`  
    : `${minutes} min ${seconds} s`

} 


  return (
    isLoading ? <PageLoader/> :
    <div className='flex items-center'>
      <Link to='#' >
        <img src={imgPath} alt={dataAlbum?.artist?.name ?? 'photo artiste'} className='w-10 h-10 rounded-full object-cover' />
      </Link>
      
<p className='font-bold text-base p-1'>{dataAlbum?.artist?.name}</p>
<Dot/>
<p className='font-bold text-base p-1'>{releaseDate}</p>
<Dot/>
<p className='font-bold text-base p-1'>{nbTitle}</p>
<Dot/>
<p className='font-bold text-base p-1'>{durationAlbum()}</p>

    </div>
  )
}

export default HeaderInfo