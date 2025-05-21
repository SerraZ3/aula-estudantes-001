import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="copyright"
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'logo',
          title: 'Gestão Escolar',
          href: '/',
          blankTarget: true,
        },

        {
          key: '2025',
          title: '2025',
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
