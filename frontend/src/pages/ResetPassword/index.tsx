import { Footer } from '@/components';
import DashboardTemplate from '@/components/DashboardTemplate';
import authService from '@/services/auth';
import { LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, useIntl } from '@umijs/max';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../config/defaultSettings';
import background from '../../assets/background_login.png';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: `url('${background}')`,
      backgroundSize: '100% 100%',
    },
  };
});

const ResetPassword: React.FC = () => {
  const [type] = useState<string>('account');
  const { styles } = useStyles();
  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const urlParams = new URL(window.location.href).searchParams;
      const token = urlParams.get('token');
      const msg = await authService.resetPassword({ ...values, token });
      if (msg.status === 'success') {
        message.success('Senha redefinida. Realize o login.');
        const mainPath = '/login';

        history.push(urlParams.get('redirect') || mainPath);
        return;
      }
    } catch (error: any) {
      if (error && error.message) {
        message.error(error.message);
      } else if (error && error.code === 'VALIDATION_ERROR') {
        message.error('As senhas não conferem.');
      } else {
        message.error(
          'Erro ao alterar a senha. Entre em contato com o suporte ou tente novamente mais tarde.',
        );
      }
    }
  };
  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <Helmet>
          <title>
            {intl.formatMessage({
              id: 'menu.login',
              defaultMessage: '登录页',
            })}
            {Settings.title && ` - ${Settings.title}`}
          </title>
        </Helmet>
        <div
          style={{
            flex: '1',
            display: 'flex',
            padding: '32px 0',
            marginTop: 50,
            justifyContent: 'center',
          }}
        >
          <LoginForm
            submitter={{
              // Configure the button text
              searchConfig: {
                submitText: 'Confirmar',
              },
            }}
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            logo={<img alt="logo" src="/logo.png" />}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <h1>Definir nova senha</h1>
            {type === 'account' && (
              <>
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'potato',
                    defaultMessage: 'Nova senha',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="passwordConfirm"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'potato',
                    defaultMessage: 'Confirmar nova senha',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}
            <br />
          </LoginForm>
        </div>
        <Footer />
      </div>
    </DashboardTemplate>
  );
};

export default ResetPassword;
