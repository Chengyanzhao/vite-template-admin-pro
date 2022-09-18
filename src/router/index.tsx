import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { useSelector } from 'react-redux';
import PageLoading from '@/components/PageLoading';
import routes from './routes';

const RouterRender: React.FC = () => {
  const authRoutes = useSelector((state: any) => state.getIn(['global', 'authRoutes']));
  const renderRoutesConf = useMemo(() => (authRoutes.length ? authRoutes : routes), [authRoutes]);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoading />} >
          <Switch>
            {renderRoutes(renderRoutesConf)}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default (RouterRender);
