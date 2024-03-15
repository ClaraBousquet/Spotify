import { createSelector } from "@reduxjs/toolkit";

// Données du slice

const selectLoading = state => state.artists.loading;
const selectArtistDetail = state => state.artists.artistDetail;

// Selector
export const selectArtistsData = createSelector(
    [selectLoading, selectArtistDetail],
    // On déstructure les données
    (loading, artistDetail) => ({ loading, artistDetail })
);