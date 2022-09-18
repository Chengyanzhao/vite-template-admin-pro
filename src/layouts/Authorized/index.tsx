/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteConfig } from 'react-router-config';
import AppConfig from '@/config';
import { MenuDataItem } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import { getSysAuth } from '@/api/authApi';
import { setMenuTreeData, setAuthButtonList, setRoutes } from '@/store/global/actionCreater';
import { menuTreeDataAdaptor, getAuthRoutes, flattenAuthMenuTree } from './auth';
import originalRoutes from '@/router/routes';
import { PropsWithChildren } from '@/interface/react.interface';

const Authorized: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const authRoutes: RouteConfig[] = useSelector((state: any) => state.getIn(['common', 'authRoutes']));

  const fetchSysAuth = async () => {
    try {
      setLoading(true);
      const res: any = await getSysAuth(AppConfig.sysKey);
      const { menu_trees = [], buttons = [] } = res;
      // store menuTreeData
      const menuTreeData: MenuDataItem[] = menuTreeDataAdaptor(menu_trees);
      dispatch(setMenuTreeData(menuTreeData));
      // 拍平auth menu tree
      const authMenuList = flattenAuthMenuTree(menu_trees);
      const targetRoutes = authRoutes.length === 0 ? originalRoutes : authRoutes;
      const routes = getAuthRoutes(targetRoutes, authMenuList);
      dispatch(setRoutes(routes));
      dispatch(setAuthButtonList(buttons));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSysAuth();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <div className="authorized">{children}</div>
  );
};

export default Authorized;
