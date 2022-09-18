import { Map } from 'immutable';
import {
  SET_ALL_CITY_LIST,
  SET_USER_INFO,
  SET_MENUTREEDATA,
  SET_AUTHBUTTON,
  SET_AUTHROUTES,
} from './actionTypes';

const defaultState: any = Map({
  allCityList: [],
  authRoutes: [],
  menuTreeData: [],
  authButton: [],
  userInfo: {},
});

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    // 所有城市列表
    case SET_ALL_CITY_LIST:
      return state.set('allCityList', action.payload);
    case SET_USER_INFO:
      return state.set('userInfo', action.payload);
    case SET_MENUTREEDATA:
      return state.set('menuTreeData', action.payload);
    case SET_AUTHBUTTON:
      return state.set('authButton', action.payload);
    case SET_AUTHROUTES:
      return state.set('authRoutes', action.payload);
    default:
      return state;
  }
};

export default reducer;
