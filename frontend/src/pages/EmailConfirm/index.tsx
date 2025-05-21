import { Footer } from '@/components';
import DashboardTemplate from '@/components/DashboardTemplate';
import authService from '@/services/auth';
import masks from '@/utils/masks';
import { LoginForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history } from '@umijs/max';
import { Checkbox, Form, message } from 'antd';
import { createStyles } from 'antd-style';
import cep from 'cep-promise';
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

const EmailConfirm: React.FC = () => {
  const [type] = useState<string>('account');
  const [titleSectionAddress, setTitleSectionAddress] = useState<string>('Endereço');
  const [term, setTerm] = useState<boolean>(false);
  // const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      if (!term) {
        message.warning('Para usar a plataforma é necessário aceitar os termos de uso');
        return;
      }
      const urlParams = new URL(window.location.href).searchParams;
      const token = urlParams.get('token');
      const msg = await authService.resetPassword({ ...values, token });
      if (msg.status === 'success') {
        message.success('Senha criada. Realize o login.');
        const mainPath = '/login';

        history.push(urlParams.get('redirect') || mainPath);
        return;
      }
    } catch (error: any) {
      if (error && error.message) {
        message.error(error.message);
      } else if (
        error &&
        error.code === 'VALIDATION_ERROR' &&
        error.errors &&
        error.errors.length > 0
      ) {
        error.errors.map((err: any) => {
          message.error(err.message);
          return err;
        });
      } else {
        message.error('Erro ao criar usuário. Tente novamente mais tarde.');
      }
    }
  };
  const consultCEP = async (value: string) => {
    try {
      if (value.length > 7) {
        const newCEPFormatted = value.replace('-', '');

        const response = await cep(newCEPFormatted);

        if (response) {
          const { city, neighborhood, state, street } = response;
          form.setFieldsValue({ userData: { city, street, state, neighborhood } });
          // setValue("city", city);
          // setValue("neighborhood", neighborhood);
          // const _uf = dataUF.UF.find((value) => value.sigla === state);
          // setUF(_uf);

          // setValue("state", state);
          // setValue("street", street);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <DashboardTemplate>
      <div className={styles.container}>
        <Helmet>
          <title>
            Cadastro
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
            form={form}
            submitter={{
              // Configure the button text
              searchConfig: {
                submitText: 'Confirmar',
              },
            }}
            // onValuesChange={(changeValues) => console.log(changeValues)}
            contentStyle={{
              display: 'flex',
              width: '50vw',
            }}
            logo={<img alt="logo" src="/logo.png" />}
            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            <h1>Quase lá!</h1>
            <p>
              Precisamos de mais algumas informações para para completar o seu cadastro na
              plataforma:
            </p>
            {type === 'account' && (
              <>
                <ProForm.Group style={{ width: '100%' }}>
                  <ProFormText
                    label="CPF/CNPJ"
                    name={['userData', 'cpfCnpj']}
                    fieldProps={{
                      size: 'large',
                      onBlur: (e) => {
                        const cpfCnpj = e.target.value;
                        if (!cpfCnpj) return '';
                        if (cpfCnpj.length > 14) {
                          setTitleSectionAddress('Endereço da sua Empresa');
                        } else {
                          setTitleSectionAddress('Endereço da sua Residência');
                        }
                      },
                    }}
                    convertValue={(e) => {
                      return masks.cpfCpjMask(e);
                    }}
                    placeholder="000.000.000-00"
                    rules={[
                      {
                        required: true,
                        message: 'Campo obrigatório',
                      },
                    ]}
                  />

                  <ProFormText
                    label="Telefone"
                    name={['userData', 'phone']}
                    fieldProps={{
                      size: 'large',
                    }}
                    placeholder="(00) 0 0000-0000"
                    convertValue={(e) => {
                      return masks.cellphoneBrMask(e);
                    }}
                    rules={[
                      {
                        required: true,
                        message: 'Campo obrigatório',
                      },
                    ]}
                  />
                  <br />
                  <br />

                  <ProForm.Group label={titleSectionAddress}>
                    <ProFormText
                      label="CEP"
                      name={['userData', 'cep']}
                      fieldProps={{
                        size: 'large',
                        onBlur: (e) => {
                          consultCEP(e.target.value);
                        },
                        // onChange: (e) => {
                        //   console.log(e.target.value);
                        //   //  consultCEP(e)
                        // },
                      }}
                      placeholder="00000-000"
                      convertValue={(e) => {
                        const cepMask = masks.cep(e);
                        return cepMask;
                      }}
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />
                    <ProFormText
                      id="state"
                      label="Estado"
                      name={['userData', 'state']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Estado"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />
                    <ProFormText
                      id="city"
                      label="Cidade"
                      name={['userData', 'city']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Cidade"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />

                    <ProFormText
                      label="Logradouro"
                      name={['userData', 'street']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Rua/Avenida"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />
                    <ProFormText
                      label="Bairro"
                      name={['userData', 'neighborhood']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Bairro"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />
                    <ProFormText
                      label="Número"
                      name={['userData', 'number']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Número"
                      rules={[
                        {
                          required: true,
                          message: 'Campo obrigatório',
                        },
                      ]}
                    />
                    <ProFormText
                      label="Complemento"
                      name={['userData', 'complement']}
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder="Ponto de referência"
                    />
                  </ProForm.Group>
                  <br />
                  <br />
                  <ProForm.Group label="Senha">
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                      }}
                      placeholder={'Nova senha'}
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
                      }}
                      placeholder={'Confirmar nova senha'}
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
                  </ProForm.Group>
                </ProForm.Group>
                <Checkbox
                  checked={term}
                  required
                  onChange={(e) => setTerm(e.target.checked)}
                  style={{ margin: '20px 0' }}
                >
                  Ao confirmar você concorda com nossos{' '}
                  <a href="/termo-de-uso.pdf" target="_blank">
                    Termos de Uso
                  </a>
                </Checkbox>
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

export default EmailConfirm;
