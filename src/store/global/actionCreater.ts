import {
  SET_ALL_CITY_LIST,
  SET_USER_INFO,
  SET_MENUTREEDATA,
  SET_AUTHBUTTON,
  SET_AUTHROUTES,
} from './actionTypes';

const setAllCityList = (payload: any) => {
  return {
    type: SET_ALL_CITY_LIST,
    payload,
  };
};

const setUserInfo = (payload: any) => {
  return {
    type: SET_USER_INFO,
    payload,
  };
};


const setMenuTreeData = (payload: any[]) => {
  return {
    type: SET_MENUTREEDATA,
    payload,
  };
};
const setAuthButtonList = (payload: string[]) => {
  return {
    type: SET_AUTHBUTTON,
    payload,
  };
};

const setRoutes = (payload: any) => {
  return {
    type: SET_AUTHROUTES,
    payload,
  };
};


export {
  setAllCityList,
  setUserInfo,
  setMenuTreeData,
  setAuthButtonList,
  setRoutes,
};
