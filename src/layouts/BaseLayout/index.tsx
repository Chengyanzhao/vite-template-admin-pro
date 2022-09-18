import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { matchRoutes, renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { Dropdown, Menu, Button, message } from 'antd';
import classNames from 'classnames';
import AppConfig from '@/config';
import { MenuDataItem } from '@ant-design/pro-layout';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import Authorized from '@/layouts/Authorized';
import PageContainerInner from '../PageContainer';
import PageNotFount from '@/components/PageNotFound';
import PageLoading from '@/components/PageLoading';
import { ssoLoginOut } from '@/api/ssoApi';
import { gotoSsoLoginPage } from '@/services/util';
import logo from '@/assets/img/logo.png';
import './index.less';

const BaseLayout: React.FC<RouteConfigComponentProps> = ({ route, history }) => {
  const settings = {
    fixSiderbar: true,
    headerHeight: 64,
  };
  const prefixCls = 'sg-baselayout';
  const classString = classNames(prefixCls);
  const branch = matchRoutes(route!.routes!, location.pathname);
  const isNotFound = !branch.length;

  const menuTreeData: MenuDataItem[] = useSelector((state: any) => state.getIn(['common', 'menuTreeData']));
  const userInfo: any = useSelector((state: any) => state.getIn(['common', 'userInfo']));

  const onLogout = async () => {
    try {
      await ssoLoginOut();
      message.success('退出成功');
      gotoSsoLoginPage();
    } catch (err) {
      console.log(err);
    }
  };
  const dropDownMenu = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={onLogout}>退出</Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Authorized>
      <div className={classString} >
        <ProLayout
          title={AppConfig.title}
          logo={logo}
          layout={AppConfig.layout}
          navTheme={AppConfig.navTheme}
          siderWidth={250}
          // location={{
          //   pathname,
          // }}
          pageTitleRender={() => AppConfig.title}
          onMenuHeaderClick={() => history.push('/')}
          menuItemRender={(menuItemProps, defaultDom) => {
            if (
              menuItemProps.isUrl ||
              !menuItemProps.path ||
              location.pathname === menuItemProps.path
            ) {
              return defaultDom;
            }
            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={false}
          rightContentRender={() => (
            <div>
              <Dropdown overlay={dropDownMenu}>
                <a onClick={(e) => e.preventDefault()}>
                  {userInfo?.userName}
                </a>
              </Dropdown>
            </div>
          )}
          // contentStyle={{ margin: '0' }}
          {...settings}
          route={{ routes: menuTreeData }}
        >
          <PageContainer pageHeaderRender={false}>
            <PageContainerInner>
              <Suspense fallback={<PageLoading />} >
                <div style={{ height: '100%', minHeight: '500px' }} >
                  {
                    isNotFound ? <PageNotFount /> : renderRoutes(route!.routes)
                  }
                </div>
              </Suspense>
            </PageContainerInner>
          </PageContainer>
        </ProLayout>
      </div>
    </Authorized>
  );
};

export default BaseLayout;
