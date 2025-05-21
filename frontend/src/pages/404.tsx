import DashboardTemplate from '@/components/DashboardTemplate';
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <DashboardTemplate>
    <Result
      status="404"
      style={{ color: 'white !important' }}
      title="404"
      subTitle={'Ops a página que você buscou não existe'}
      extra={
        <Button type="primary" onClick={() => history.push('/user/dashboard')}>
          Página principal
        </Button>
      }
    />
  </DashboardTemplate>
);

export default NoFoundPage;
