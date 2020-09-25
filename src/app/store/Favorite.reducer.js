import * as actionTypes from './Favorite.action';

const initialState = {
  myFavoritisList:'',
  showFavoritiesModal:false,
  showContributorModal:false
}
export const rootReducer=(state=initialState, action)=>{
  switch(action.type){
    case actionTypes.LISTOFFAVORITES:
      return {
        ...state,
        myFavoritisList:action.favoritiesList
      }
    case actionTypes.SHOW_HIDE_FAV_MODAL:
      return {
        ...state,
        showFavoritiesModal:action.isDone,
      }
    case actionTypes.SHOW_HIDE_CON_MODAL:
      return {
        ...state,
        showContributorModal:action.isDone,
      }

      default:
        return state;
  }
}