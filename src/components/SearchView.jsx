import React from 'react'
import { useSelector } from 'react-redux';
import { selectAlbumsData } from '../redux/album/albumSelector';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';

const SearchView = () => {

// On récupère les infos du slice album

const {searchAlbum, searchArtist} = useSelector(selectAlbumsData);


// On récupère les infos du slice player pour alimenter le composant album card
const{isPlaying, activeSong} = useSelector(state => state.player);


// on récupère le tableua de données de searchAlbum
const dataAlbum = searchAlbum['hydra:member'];

// on récupère le tableau de données de searchartist
const dataArtist = searchArtist['hydra:member'];

  return (
  <>
  {/* Partie albums */}
{dataAlbum && dataAlbum.length > 0
? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des albums </h2>
: <h2 className='font-bold text-3xl text-pink-200 text-left mt-10 mb-4'>Aucun album correspondant..</h2>
}
<div className='flex flex-wrap'>
    {dataAlbum && dataAlbum.map((data, index)=>(
        <div className='p-3 m-3' key={`album_${index}`}>
            <AlbumCard 
            data={data}
            songs={data?.songs}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            />
        </div>
    ))

    }

</div>
{/* Partie artiste */}
{dataArtist && dataArtist.length > 0
? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultat des artistes </h2>
: null
}
<div className='flex flex-wrap'>
    {dataArtist && dataArtist.map((data, index)=>(
        <div className='p-3 m-3' key={`artist_${index}`}>
            <ArtistCard dataArtist={data} />
        </div>
    ))

    }

</div>


  </>
  )
}

export default SearchView