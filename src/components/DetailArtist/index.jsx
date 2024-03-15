import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistDetail } from '../../redux/artist/artistSlice';
import { selectArtistData } from '../../redux/artist/artistSelector';
import PageLoader from '../Loader/PageLoader';
import HeaderDetail from './HeaderDetail';
import BiographyArtist from './BiographyArtist';
import ListAlbumArtist from './ListAlbumArtist';

const DetailArtist = () => {

  const params = useParams();
  const dispatch = useDispatch();
  //on récupère l'id de l'artiste (depuis l'url)
  const id = params.id;
  
  useEffect(() => {
    dispatch(fetchArtistDetail(id))
    
  }, [])

  
  const {artistDetail, loading} = useSelector(selectArtistData)
  console.log('artistDetail', artistDetail)

  return (
    loading ? <PageLoader /> : 
    <>
      <HeaderDetail dataArtist={artistDetail} />
      <BiographyArtist dataArtist={artistDetail} />
      <ListAlbumArtist dataArtist={artistDetail} />
    </>
    
  )
}

export default DetailArtist