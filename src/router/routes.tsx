import { Redirect } from 'react-router-dom';
import { RouteConfig } from 'react-router-config';
import SecurityLayout from '@/layouts/SecurityLayout/index';
import BaseLayout from '@/layouts/BaseLayout';
import Home from '@/pages/Home';
// import CouponRoutes from '@/pages/Coupon/routes';
// import Given from '@/pages/Given/routes';

const AuthRoutes: RouteConfig[] = [
  {
    path: '/',
    component: BaseLayout,
    routes: [
      // home
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
        },
      },
      // ...GiftCardRoutes,
      // ...CouponRoutes,
      {
        path: '/',
        render: () => <Redirect to={'/home'} />,
      },
    ],
  },
];

const routes: RouteConfig[] = [
  {
    path: '/',
    component: SecurityLayout,
    routes: AuthRoutes,
  },
];

export default routes;
