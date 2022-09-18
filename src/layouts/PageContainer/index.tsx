import React, { useEffect } from 'react';

import {
  dispatchCityList,
} from '@/store/global/dispatch';

interface IPageContainerProps {
  children: any;
}
const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
  useEffect(() => {
    dispatchCityList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
    </>
  );
};
export default React.memo(PageContainer);
