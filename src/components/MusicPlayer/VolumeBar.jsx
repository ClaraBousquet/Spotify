import React from 'react'
import { BiVolumeFull, BiVolumeMute, BiVolumeLow } from 'react-icons/bi'

const VolumeBar = ({value, min, max, onChange, setVolume}) => {
  return (
    <div className='hidden lg:flex flex-1 items-center justify-end'>
        {value <= 1 && value > 0.5 && <BiVolumeFull className='cursor-pointer'size={25} color='pink' onClick={()=>setVolume(0)}/> }
        {value <= 0.5 && value > 0 && <BiVolumeLow className='cursor-pointer'size={25} color='pink' onClick={()=>setVolume(0)}/> }
        {value == 0 &&  <BiVolumeMute size={25} className='cursor-pointer'color='#fff' onClick={()=>setVolume(1)}/> }
        <input 
        type="range" 
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className='2xl:w-40 lg:w-32 h-1 ml-2'
         />
         <p className='text-white ml-1'>{Math.floor(value * 100)} %
         </p>
    </div>
  )
}

export default VolumeBar