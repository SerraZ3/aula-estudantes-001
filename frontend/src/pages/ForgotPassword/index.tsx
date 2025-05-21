import { Footer } from '@/components';
import DashboardTemplate from '@/components/DashboardTemplate';
import authService from '@/services/auth';
import { UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, Link, useIntl } from '@umijs/max';
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

const ForgotPassword: React.FC = () => {
  const [type] = useState<string>('account');
  const { styles } = useStyles();
  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await authService.forgotPassword({ ...values });
      if (msg.status === 'success') {
        message.success('E-mail enviado! Confira sua caixa de mensagens.');

        const urlParams = new URL(window.location.href).searchParams;
        const mainPath = '/login';

        history.push(urlParams.get('redirect') || mainPath);
        return;
      }
    } catch (error: any) {
      if (error && error.code === 'USER_DO_NOT_EXIST') {
        message.error('Falha ao recuperar senha. Verifique o e-mail informado.');
      } else if (error && error.code === 'VALIDATION_ERROR') {
        message.error('Falha ao recuperar senha. Verifique o e-mail informado.');
      } else {
        message.error(
          'Erro ao recuperar a senha. Entre em contato com o suporte ou tente novamente mais tarde.',
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
                submitText: 'Enviar',
              },
            }}
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
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
            <h1>Esqueceu a senha?</h1>
            <p>Digite seu endereço de email para receber o link de recuperação de senha.</p>

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
                      message: 'Por favor informe um e-mail.',
                    },
                  ]}
                />
              </>
            )}

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Link
                to="/login"
                style={{
                  float: 'left',
                  marginBottom: 10,
                }}
              >
                <FormattedMessage id="batata" defaultMessage="Retornar para login" />
              </Link>
            </div>
            <br />
          </LoginForm>
        </div>
        <Footer />
      </div>
    </DashboardTemplate>
  );
};

export default ForgotPassword;
