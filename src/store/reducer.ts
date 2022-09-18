import { combineReducers } from 'redux-immutable';

import { reducer as global } from './global';
import { reducer as home } from '@/pages/Home/store';

const reducer = combineReducers({
  global,
  home,
});

export default reducer;
