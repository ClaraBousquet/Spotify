import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch,  } from 'react-redux';
import { fetchSearch } from '../redux/album/albumSlice';

const SearchBar = () => {

// on déclare un state pour le champ de recherche
const [searchWord, setSearchWord] = useState('');

// On récupère le hook dispatch

const dispatch = useDispatch();

console.log('searchword', searchWord);
const handleSubmit = (e) => {
    e.preventDefault();
dispatch(fetchSearch(searchWord));
}

  return (
   <form 
   onSubmit={handleSubmit}
   autoComplete='off'
   className='p-2 text-pink-400 focus-whitin:text-gray-600'
   >
    <label className='sr-only text-white'>On écoute quoi ?</label>
    <div className='flex justify-start items-center'>
        <BiSearch className='w-5 h-5 ml-4' />
        <input type="text"
        className='flex-1 bg-transparent border-none placeholder-pink-400 outline-none text-base text-white p-4'
        autoComplete='off'
        placeholder='Rechercher un album, un artiste, une chanson...'
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        />
        <button type="submit" className='bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded'>Rechercher</button>
    </div>
   </form>
  )
}

export default SearchBar