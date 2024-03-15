import React from 'react'
import { artistUrl, imageUrl } from '../../constants/apiConstant';

const HeaderDetail = ({dataArtist}) => {

const imgPath = dataArtist?.imagePath 
?`${artistUrl}/${dataArtist?.imagePath}`
 : `${imageUrl}/artist.png`;

 const name = dataArtist?.name ?? 'artiste inconnu';

  return (
    <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
        <img src={imgPath} alt={name} className='w-48 h-48 m-1 rounded-full object-cover' />
        <div className='ml-10 flex flex-col justify-end'>
            <h1 className='text-5xl font-bold text-white my-7'>{name}</h1>
            </div>
        </div>
  )
}

export default HeaderDetail