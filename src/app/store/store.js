import {createStore} from 'redux';
import {rootReducer} from './Favorite.reducer';

export const store = createStore(rootReducer);