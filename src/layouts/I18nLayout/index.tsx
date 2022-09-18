import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Locale } from 'antd/lib/locale-provider';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { PropsWithChildren } from '@/interface/react.interface';

moment.locale('zh-cn');

interface I18nLayoutProps extends PropsWithChildren {
  locale?: Locale;
}
const I18nLayout: React.FC<I18nLayoutProps> = ({ locale = zhCN, children }) => {
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};
export default I18nLayout;
