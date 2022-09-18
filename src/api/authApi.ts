import authService from '../services/authService';

export const getSysAuth = (sysKey: string): Promise<any> => {
  return authService.post('/auth/permission', { params: { sys_key: sysKey } });
};

