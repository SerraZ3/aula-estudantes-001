import { PageContainer } from '@ant-design/pro-components';
import { ConfigProvider, Tooltip } from 'antd';
import React, { useEffect } from 'react';

// import { Container } from './styles';
type Props = {
  children?: React.ReactNode;
  content?: {
    id: string;
    defaultMesssage: string;
  };
};
const DashboardTemplate: React.FC<Props> = ({ children, content }) => {
  return (
    <div>
      <PageContainer
        style={{ padding: 0 }}
        content={content ? 'Essa página só pode ser vista por administrador' : ''}
      >
        <div style={{ padding: '20px 10px' }}>{children}</div>
        {/* <a
            href="https://api.whatsapp.com/send?phone=5571920030016&text=Ol%C3%A1%2C+tenho+algumas+d%C3%BAvidas"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'fixed',
              bottom: 10,
              right: 10,
              zIndex: 100,
            }}
          >
            <Tooltip
              placement="left"
              title={'Precisa de ajuda? Entre em contato'}
              color={'#1FAF38'}
            >
              <img
                src="/wpp.svg"
                style={{
                  width: 50,
                }}
              />
            </Tooltip>
          </a> */}
      </PageContainer>
    </div>
  );
};

export default DashboardTemplate;
