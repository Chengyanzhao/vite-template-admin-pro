import moment from 'moment';

// 无空格
export const noWhiteSpaceRule = { pattern: /^[^\s]*$/, message: '禁止输入空格' };

// 数字
export const numberRule = { pattern: /^[0-9]*$/, message: '非数字' };
// 正整数
export const positiveIntegerRule = { pattern: /^[1-9]\d*$/, message: '请输入正整数' };
// 非负整数
export const NoDownZeroIntegerRule = { pattern: /^[+]{0,1}(\d+)$/, message: '非负整数' };
// 最多两位小数
export const precision2Rule = { pattern: /^([0-9]*)+(\.[0-9]{1,2})?$/, message: '最多两位小数' };
// 正数
export const positiveRule = { validator: (rule: any, val: number) => val > 0, message: '请输入大于0的数字' };

// 时间区间必填check
export const requiredRangeDateRule = {
  message: '时间必填',
  validator: (rule: any, val: [moment.Moment, moment.Moment]) => {
    if (!val || !val.length) {
      return false;
    }
    const [start, end] = val;
    return !!start && !!end;
  },
};

// 关联卡券-空值
export const requiredProductIdRule = {
  message: '关联卡券存在空值',
  validator: (rule: any, val: Array<{ id: number }>) => {
    if (!val || !val.length) {
      return false;
    }
    return !val.some((item) => !item.id);
  },
};

// 关联卡券-重复校验
export const repeatProductIdRule = {
  message: '关联卡券禁止重复',
  validator: (rule: any, val: Array<{ id: number }>) => {
    if (!val || !val.length) {
      return false;
    }
    const idList = val.map((item) => item.id);
    const idSet = new Set(idList);
    const noRepeatArr = [...idSet];
    return noRepeatArr.length === idList.length;
  },
};
