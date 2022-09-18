import React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const EmptyLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
  return renderRoutes(route!.routes);
};
export default EmptyLayout;
