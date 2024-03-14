import React from 'react'
import { Link } from 'react-router-dom'

const HeaderCategory = ({dataAlbum}) => {
const categories = dataAlbum?.genre
const Dot = () => (
    <p className='mx-2'>&#8226;</p>
)
  return (
   <div className='flex items-center justify-start mt-4'>
    {categories && categories.map((category,index) => (
index === 0 
? <Link key={index} to='#' className='font-medium'>{category.label}</Link> 
: <>
<Dot />
<Link key={index} to='#' className='font-medium'>{category.label}</Link>
</>    
   
    ))}
   </div>
  )
}

export default HeaderCategory