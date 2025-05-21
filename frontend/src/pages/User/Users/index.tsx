import DashboardTemplate from '@/components/DashboardTemplate';
import usersService from '@/services/users';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Card, Form, message, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

type DataItem = {
  id: string;
  fullname: string;
  email: string;
  role: string;
  created_at: string;
};

const columns: ProColumns<DataItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    // copyable: true,
    editable: false,
    ellipsis: true,
    // tooltip: 'key',
  },
  {
    title: 'Nome Completo',
    dataIndex: 'fullname',
    copyable: true,
    ellipsis: true,
    tooltip: 'Nome completo do usuário',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
    tooltip: 'E-mail',
  },
  {
    disable: true,
    title: 'Permissão',
    dataIndex: 'role',
    editable: false,
    // search: false,

    render: (text: any) => {
      const options: any = { admin: 'Administrador', user: 'Usuário' };
      return (
        <Space>
          <Tag color={'green'}>{options[text]}</Tag>
        </Space>
      );
    },
  },
  {
    title: 'Data de criação',
    key: 'created_at',
    dataIndex: 'createdAt',
    valueType: 'date',
    editable: false,
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Ações',
    valueType: 'option',
    key: 'id',
    render: (text, record, idx, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log(record.id);
          action?.startEditable?.(record.id);
        }}
      >
        Editar
      </a>,
    ],
  },
];
const updateData = async () => {
  let res = await usersService.list();

  return { data: res.data };
};
const Students: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [newToken, setNewToken] = useState('');
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DashboardTemplate>
      <Card style={{ marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10 }}>
        <ProTable<DataItem>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          onReset={updateData}
          onChange={updateData}
          request={updateData}
          editable={{
            type: 'multiple',
            saveText: 'Salvar',
            deleteText: 'Deletar',
            deletePopconfirmMessage: 'Ao deletar o dado não estará mais disponível',
            cancelText: 'Cancelar',
            onCancel: async (_id, data) => {
              return;
            },
            onSave: async (_id, data: any, originalRow) => {
              try {
                if (originalRow.email === data.email) delete data.email;
                let res = await usersService.update(_id as string, data);
                if (res.success) {
                  message.success('Usuário atualizado com sucesso');

                  return;
                }
                message.error(res.message || 'Erro ao atualizar usuário');
              } catch (error) {
                message.error('Erro ao atualizar usuário');
              }
            },
            onDelete: async (_id) => {
              try {
                let res = await usersService.delete(_id as string);
                if (res.success) {
                  message.success('Usuário atualizado com sucesso');

                  return;
                }
                message.error(res.message || 'Erro ao atualizar usuário');
              } catch (error) {
                message.error('Erro ao atualizar usuário');
              }
            },
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            defaultValue: {
              option: { fixed: 'right', disable: true },
            },
            // onChange(value) {
            //   console.log('value: ', value);
            // },
          }}
          rowKey="id"
          search={false}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          // form={{
          //   // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          //   syncToUrl: (values, type) => {
          //     if (type === 'get') {
          //       return {
          //         ...values,
          //         created_at: [values.startTime, values.endTime],
          //       };
          //     }
          //     return values;
          //   },
          // }}
          pagination={{
            pageSize: 10,
            // onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="Lista de usuários"
          toolBarRender={() => [
            <ModalForm<{
              name: string;
              company: string;
            }>
              key="add_token_access"
              title={newToken ? '' : 'Adicionar usuário'}
              trigger={
                <Button type="primary">
                  <PlusOutlined />
                  Adicionar
                </Button>
              }
              form={form}
              autoFocusFirstInput
              modalProps={{
                destroyOnClose: true,
                // onCancel: () => console.log('run'),
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                try {
                  console.log(values);
                  actionRef?.current?.reload();
                  if (newToken) {
                    setNewToken('');
                    return true;
                  }
                  const res = await usersService.create(values);
                  if (res.status) {
                    message.success('Usuário criado com sucesso!');
                    setNewToken(res.data);
                    return false;
                  } else {
                    message.error(res.message || 'Falha ao criar Usuário!');
                  }
                } catch (error) {
                  message.error('Falha ao criar Usuário!');
                }
              }}
            >
              {newToken ? (
                <Card style={{ marginTop: 20 }}>
                  <Typography.Title level={5}>Chave gerada com sucesso!</Typography.Title>
                  {/* <Typography.Paragraph>
                    Salve o token abaixo. Após fechar o pop-up o token não estará mais disponível
                    para visualização
                  </Typography.Paragraph> */}
                  <br />
                  <Typography.Paragraph type={'warning'} copyable={true}>
                    {newToken}
                  </Typography.Paragraph>
                </Card>
              ) : (
                <ProForm.Group>
                  <ProFormText
                    width="md"
                    name="fullname"
                    label="Nome completo*"
                    tooltip="Digite o nome completo"
                    placeholder="Digite o nome completo"
                    rules={[{ required: true, message: 'Digite o nome' }]}
                  />
                  <ProFormSelect
                    name="role"
                    width="md"
                    label="Selecione a regra do usuário"
                    valueEnum={{ user: 'Usuário', admin: 'Administrador' }}
                    placeholder="Selecione a regra"
                    rules={[{ required: true, message: 'Selecione a regra' }]}
                  />

                  <ProFormText
                    width="md"
                    name="email"
                    label="E-mail*"
                    tooltip="Digite o e-mail"
                    placeholder="Digite o e-mail"
                    rules={[{ required: true, message: 'Digite o email' }]}
                  />
                  <ProFormText.Password
                    width="md"
                    name="password"
                    label="password"
                    tooltip="Digite a senha"
                    placeholder="Digite a senha"
                    rules={[{ required: true, message: 'Digite a senha' }]}
                  />
                  {/* <ProFormDatePicker name="contractTime" label="Data de expiração" /> */}
                </ProForm.Group>
              )}
            </ModalForm>,
          ]}
        />
      </Card>
    </DashboardTemplate>
  );
};

export default Students;
