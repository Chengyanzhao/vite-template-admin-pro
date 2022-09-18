import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Result, Button } from 'antd';

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <Result
      status="404"
      style={{
        height: '100%',
        background: '#fff',
      }}
      title="未找到此页面"
      subTitle="抱歉，您访问的页面不存在，请检查Url是否正确。"
      extra={
        <>
          <Button type="primary" onClick={history.goBack}>返回</Button>
          <Button onClick={() => history.push('/')}>首页</Button>
        </>
      }
    />
  );
};

export default withRouter(PageNotFound);
