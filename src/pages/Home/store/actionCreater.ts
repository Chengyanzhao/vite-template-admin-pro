// 创建任务异步任务和同步任务
// 引入用于判断的常量
import { AGREENUM } from './actionTypes';

const changeAgreeNum = (item: any) => {
  return {
    type: AGREENUM,
    item,
  };
};
export {
  changeAgreeNum,
};
