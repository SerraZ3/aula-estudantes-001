import { Footer } from '@/components';
import DashboardTemplate from '@/components/DashboardTemplate';
import authService from '@/services/auth';
import authStorage from '@/storage/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, Link, useIntl, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
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

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<any>({});
  const [type] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await authService.checkLogin();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo.user,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await authService.login({ ...values });

      // if (msg.user.role !== 'user') {
      //   message.error('Sem permissão para essa área');
      //   return;
      // }
      console.log(msg);
      if (msg.success) {
        authStorage.set(msg.token);
        console.log(msg.user);

        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: msg.user,
          }));
        });

        // await fetchUserInfo();

        message.success('Login realizado com sucesso!');

        const urlParams = new URL(window.location.href).searchParams;
        const mainPath = '/profile';
        history.push(urlParams.get('redirect') || mainPath);
        return;
      } else {
        message.error(msg.message || 'Falha ao realizar Login!');
      }

      setUserLoginState(msg);
    } catch (error: any) {
      if (error && error.message) {
        if (error.code === 'UPDATE_PASSWORD') {
          message.warning(error.message);
          history.push('/forgot-password');
        } else {
          message.error(error.message);
        }
      } else if (error && error.code === 'VALIDATION_ERROR') {
        message.error('Verifique os campos novamente.');
      } else {
        message.error(
          'Erro ao realizar login. Entre em contato com o suporte ou tente novamente mais tarde.',
        );
      }
    }
  };
  const { status, type: loginType } = userLoginState;

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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 0',
            marginTop: 50,
          }}
        >
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
              padding: 0,
              height: 'auto',
            }}
            submitter={{
              // Configure the button text
              searchConfig: {
                submitText: 'Entrar',
              },
            }}
            logo={<img alt="logo" src="/logo.png" />}
            // title="SakCripto"
            subTitle={''}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误(admin/ant.design)',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined />,
                  }}
                  placeholder="E-mail"
                  rules={[
                    {
                      required: true,
                      message: 'Informe um e-mail',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                  }}
                  placeholder="Senha"
                  rules={[
                    {
                      required: true,
                      message: 'Informe uma senha',
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && (
              <LoginMessage content="Erro no login" />
            )}

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Link
                to="/forgot-password"
                style={{
                  float: 'right',
                }}
              >
                Esqueceu a senha?
              </Link>
              <br />
            </div>
          </LoginForm>
        </div>
        <Footer />
      </div>
    </DashboardTemplate>
  );
};

export default Login;
