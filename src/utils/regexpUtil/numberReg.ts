// 纯数字
export const numberRegexp = /^[0-9]*$/;

// 正整数
export const positiveIntegerRegexp = /^[1-9]\d*$/;

// 非负整数
export const noDownZeroIntegerRegexp = /^[+]{0,1}(\d+)$/;

// 最多两位小数
export const precision2Regexp = /^([0-9]*)+(\.[0-9]{1,2})?$/;

/**
 * 获取固定n位小数的数字校验正则
 * @param limitLength
 * @returns
 */
export const getLimitPrecisionRegexp = (limitLength: number) => {
  return new RegExp(`^([0-9]*)+(\\.[0-9]{${limitLength}})?$/`);
};

/**
 * 获取最多n位小数的数字校验正则
 * @param maxLimitLength
 * @returns
 */
export const getMaxPrecisionRegexp = (maxLimitLength: number) => {
  const cacheArray: number[] = [];
  let i = 1;
  while (i <= maxLimitLength) {
    cacheArray.push(i);
    i += 1;
  }
  return new RegExp(`^([0-9]*)+(\\.[0-9]{${cacheArray.join(',')}})?$/`);
};
