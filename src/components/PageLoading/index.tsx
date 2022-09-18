import React from 'react';
import { Spin } from 'antd';

interface PageLoadingProps {
  tip?: string;
}
const PageLoading: React.FC<PageLoadingProps> = ({ tip }) => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <Spin size="large" tip={tip} />
  </div>
);

export default PageLoading;
