interface IAppConfig {
  title: string;
  sysKey: string;
  layout: 'side' | 'top' | 'mix';
  navTheme: 'light' | 'realDark' | undefined;
}
const AppConfig: IAppConfig = {
  title: 'vite template admin pro',
  sysKey: 'admin-pro',
  layout: 'side',
  navTheme: 'realDark',
};

export default AppConfig;
