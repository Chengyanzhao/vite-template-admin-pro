import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { setUserInfo } from '@/store/global/actionCreater';
import PageLoading from '@/components/PageLoading';
import { ssoLoginCheck } from '@/api/ssoApi';

const SecurityLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // SSO登录验证;
  const fetchSsologinCheck = async () => {
    try {
      setLoading(true);
      const res: any = await ssoLoginCheck();
      setIsLogin(true);
      setLoading(false);
      dispatch(setUserInfo(res));
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSsologinCheck();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  if (!isLogin) {
    // 跳转登录页
    const queryString = window.location.search;
    return (
      <>
        <Redirect to={`/user/login?${queryString}`} />;
      </>
    );
  }

  return renderRoutes(route!.routes);
};

export default React.memo(SecurityLayout, (prevProps, nextProps) => {
  return prevProps.route === nextProps.route;
});

