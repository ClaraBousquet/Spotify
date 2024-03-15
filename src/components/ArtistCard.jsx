import React from 'react'
import { artistUrl, imageUrl } from '../constants/apiConstant';
import { Link } from 'react-router-dom';

const ArtistCard = ({ dataArtist }) => {
  //on declare notre constante d'image
  const imgPath = dataArtist?.imagePath
    ? `${artistUrl}/${dataArtist?.imagePath}`
    : `${imageUrl}/artist.png`;
  const userId = dataArtist?.id ?? 0
  const name = dataArtist?.name ?? 'Inconnu'

  return (
    <Link to={`/artist-detail/${userId}`}>
      <div className='flex flex-col justify-center items-center bg-white_01 rounded-lg shadow-lg p-4'>
        <div className='flex flex-col justify-center items-center'>
          <img src={imgPath} alt={name} className='rounded-full w-40 h-40 object-cover' />
          <h3 className='font-bold text-xl text-white text-center mt-2'>{name}</h3>
        </div>
      </div>

    </Link>
  )
}

export default ArtistCard