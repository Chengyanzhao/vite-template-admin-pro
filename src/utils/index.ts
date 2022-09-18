import NP from 'number-precision';

export const checkBtnAuth = (key: string, authButtons: string[] = []) => authButtons.includes(key);

/**
 * 金额单位转换：元 -> 分
 * @param yuan
 * @returns
 */
export const yuan2cent = (yuan: number) => {
  const value = Number(yuan);
  if (Number.isNaN(value)) {
    throw new Error('金额转换参数非数字!');
  }
  return NP.times(value, 100);
};

/**
 * 金额单位转换：分 -> 元
 * @param yuan
 * @returns
 */
export const cent2Yuan = (fen: number) => {
  const value = Number(fen);
  if (Number.isNaN(value)) {
    throw new Error('金额转换参数非数字!');
  }
  return NP.times(value, 0.01);
};

/**
 * 金额检查(分)
 */
export const moneyCheck = (value: number) => {
  const val = Number(value);
  if (Number.isNaN(val)) {
    throw new Error('金额非数字');
  }
  const reg = /^(0|[1-9]\d*)\.\d+$/;
  return reg.test(value.toString());
};

/**
 * 公共页码组件参数
 */
export const commonPaginationConf = {
  showTotal: (t: number) => `总共 ${t} 条数据`,
};

// 第一个参数传规则数组  第二个参数传当前售卖位ID  第三个参数传卡片类型
export const setDisabled = (ruleList: any, val: any, type: number) => {
  // 判断做一层兜底,对于老数据的type不存在的情况处理
  if (isNaN(type) || isNaN(val)) {
    return true;
  } else {
    let isDisabled = false;
    const newRuleList = ruleList.find((item: any) => item.coupon_package_filter_type === type);
    isDisabled = newRuleList?.disableRule.includes(val);
    return isDisabled;
  }
};

export const isEmptyValue = (val: any) => {
  return val === null || val === undefined || (typeof val === 'string' && val.trim() === '');
};
