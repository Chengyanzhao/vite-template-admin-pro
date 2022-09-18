import { ISelectOption } from '@/types';
/**
 * 业务枚举Tools
 */

/**
 * 获取options label数组
 * @param options 选项列表
 * @returns any[]
 */
export const getOptionsLabelArr = (options: (ISelectOption)[] = []) => {
  return options ? options.map((item) => item.label) : [];
};

/**
 * 获取options value数组
 * @param options 选项列表
 * @returns any[]
 */
export const getOptionsValueArr = (options: (ISelectOption)[] = []) => {
  return options ? options.map((item) => item.value) : [];
};

/**
 * 获取table-render所需的enum对象
 * @param options
 * @returns
 */
export const getTableRenderEnumByOptions = (options: ISelectOption[] = []) => {
  const enumMaps: any = {};
  options.forEach((item) => {
    enumMaps[item.value] = item.label;
  });
  return enumMaps;
};

/**
 * 筛选options选项列表
 * @param filterList 枚举值列表
 * @param options 全部options
 * @returns filtered options
 */
export const filterOptions = (filterList: any[], options: ISelectOption[]) => {
  return options.filter((item) => filterList.includes(item.value));
};

export const getOptionLabel = (value: any, options: ISelectOption[] = []) => {
  const optItem = options.find((item: any) => item.value === value);
  return optItem?.label || value;
};
