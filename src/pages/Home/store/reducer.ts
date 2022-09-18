// 这个各个子级管理员
import { Map } from 'immutable';

// 导入用于判断的常量
import { AGREENUM } from './actionTypes';
// 给一个默认值
const defaultState = Map({
  agreenum: 666,
});

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    // 显示和隐藏
    case AGREENUM:
      return state.set('agreenum', action.item);
    default:
      return state;
  }
};

export default reducer;
