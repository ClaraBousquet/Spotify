import  parse from 'html-react-parser';
import React from 'react'

const BiographyArtist = ({dataArtist}) => {
const bio = dataArtist?.biography 
? parse(dataArtist?.biography)
:'Aucune biographie disponible';

  return (
    <div className='flex justify-center md:justify-start md:ml-2 my-5'>
        <div className='w-[70%] flex flex-col md:w-[60%'>
            <h2 className='text-2xl mb-4'>Biographie de {dataArtist?.name}</h2>
            <p className='text-justify'>{bio}</p>
        </div>
    </div>
  )
}

export default BiographyArtist