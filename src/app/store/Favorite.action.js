export const LISTOFFAVORITES = 'LISTOFFAVORITES';
export const SHOW_HIDE_FAV_MODAL = 'SHOW_HIDE_FAV_MODAL';
export const SHOW_HIDE_CON_MODAL = 'SHOW_HIDE_CON_MODAL';

export const listOfFavorities=(favoritiesList)=>{
  return{
    type : LISTOFFAVORITES,
    favoritiesList
  }
}
export const showHideFavoriteModal=(isDone)=>{
  return{
    type : SHOW_HIDE_FAV_MODAL,
    isDone
  }
}
export const showHideContributorModal=(isDone)=>{
  return{
    type : SHOW_HIDE_CON_MODAL,
    isDone
  }
}