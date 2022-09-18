import baseService from '@/services/baseService';

/**
 * 获取全部城市列表
 * @param params
 * @returns
 */
export const getAllCityList = (params = { cityOpenType: 1 }) => baseService.post('/city/list', params);
