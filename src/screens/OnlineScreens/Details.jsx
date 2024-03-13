import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAlbumDetail } from '../../redux/album/albumSlice';
import { selectAlbumsData } from '../../redux/album/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import DetailAlbum from '../../components/DetailAlbum';

const Details = () => {
const params = useParams();
const dispatch = useDispatch();

// On récupère l'id de l'album passé dans l'url
const id = params.id;

useEffect(()=> {
    dispatch(fetchAlbumDetail(id))
    },[])
const {loading, albumDetail} = useSelector(selectAlbumsData)
return (
        loading ? <PageLoader /> :
        <DetailAlbum dataAlbum={albumDetail}/>
    )
}

export default Details