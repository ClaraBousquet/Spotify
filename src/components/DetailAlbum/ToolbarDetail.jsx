import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import PageLoader from '../Loader/PageLoader';
import PlayPause from '../PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';

const ToolbarDetail = ({ dataAlbum }) => {
  //on déclare nos constantes
  const data = dataAlbum;
  const songs = dataAlbum?.songs;
  //on déclare nos states
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isInList, setIsInList] = useState(false);

  //on récupère les hooks
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [])

  //on récupère les données des slices
  const { isPlaying, activeSong } = useSelector(state => state.player);

  //méthode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  //méthode lorsqu'on met en lecture
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum({ data }));
    dispatch(playPause(true));
  }

  //méthode pour gérer le favorie
  const toggleFavorite = () => {
    setIsInList(!isInList);
    //TODO : enregistrer dans la base de donnée
  }

  //méthode pour ouvrir ou fermer le collapse
  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  }


  return (
    isLoading ? <PageLoader /> :
      <>
        <div className='flex items-center ms-5'>
          <div className='cursor-pointer me-3'>
            <PlayPause
              songs={songs}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(index)}
              isPlaying={isPlaying}
              activeSong={activeSong}
              index={index}
              data={data}
            />
          </div>
          {/* bouton favorie */}
          <div className='cursor-pointer' onClick={() => toggleFavorite()}>
            {isInList ?
              <AiFillHeart className='text-green m-3' style={{ fontSize: '30px' }} />
              :
              <AiOutlineHeart className='text-green m-3' style={{ fontSize: '30px' }} />}
          </div>
          {/* bouton collapse */}
          <div className='cursor-pointer' onClick={handleCollapseClick}>
            {isCollapsed ?
              <AiFillInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />
              :
              <AiOutlineInfoCircle className='text-green m-3' style={{ fontSize: '30px' }} />}
          </div>
        </div>
        {/* on récupère les infos du collapse */}
        <div>
          <Collapse isOpened={isCollapsed}>
              {/* affichage du rendu du collapse */}
              <InfoCollapse dataAlbum={dataAlbum} />
          </Collapse>
        </div>
      </>
  )
}

export default ToolbarDetail