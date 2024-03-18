import React, { useState } from 'react'
import { dataAlbumNav, dataUserNav, imgLogo, styleIcon } from '../constants/appConstant'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import NavLinks from './NavLinks'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

const Sidebar = () => {
  const [mobileMenu, isMobileMenu] = useState(false);

  // On récupère l'id de l'utilisateur
  const {userId, signOut} = useAuthContext();

  // On récupère le hook de navigation
  const navigate = useNavigate();

  // On crée une méthode de déconnexion
  const handleLogout = () => {
    signOut();
    navigate('/');
  }

  return (
    <>
      {/* navbar pour la vue au dessus de 768px */}
      <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black'>
        <img src={imgLogo} alt="Logo Spotify" className='w-full h-14 object-contain' />
        <NavLinks data={dataAlbumNav} marginTop={'mt-10'} />
        <NavLinks data={dataUserNav} marginTop={'mt-5'} userId={userId} />
        {/* bouton de déconnexion */}
        <div className='mt-5'>
          <button onClick={()=>{
            const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?')
            if(confirmLogout){
              handleLogout();
            }
          }}
          
          className='w-full flex justify-start items-center  text-white text-sm hover:bg-green_06 font-bold p-3 '
          
          >
            <FiLogOut className='w-6 h-6 mr-2' /> Se deconnecter
          </button>
        </div>
              </div>
      {/* gestion des icones pour ouvrir/fermer le menu en petit ecran */}
      <div className='absolute md:hidden block top-6 right-3'>
        {mobileMenu ? (
          <RiCloseLine
            style={styleIcon}
            className='text-white mr-2'
            onClick={() => isMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            style={styleIcon}
            className='text-white mr-2'
            onClick={() => isMobileMenu(true)}
          />
        )}
      </div>

      {/* navbar pour la vue en dessous de 768px */}
      <div className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white_01 to-black backdrop-blur-lg p-6 md:hidden smooth-transition ${mobileMenu ? 'left-0' : '-left-full'}`}>
        <img src={imgLogo} alt="Logo Spotify" className='w-full h-14 object-contain' />
        <NavLinks data={dataAlbumNav} marginTop={'mt-10'} handleClick={() => isMobileMenu(false)} />
        <NavLinks data={dataUserNav} marginTop={'mt-5'} handleClick={() => isMobileMenu(false)} />
      </div>
    </>
  )
}

export default Sidebar