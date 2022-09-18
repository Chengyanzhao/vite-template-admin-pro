import ssoService from '@/services/ssoService';

export const ssoLoginCheck = () => ssoService.post('/sso/login-check');

export const ssoLoginOut = () => ssoService.post('/sso/logout');
