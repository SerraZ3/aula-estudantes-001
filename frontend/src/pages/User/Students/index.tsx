import DashboardTemplate from '@/components/DashboardTemplate';
import studentsService from '@/services/students';
import masks from '@/utils/masks';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Form, message, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

type DataItem = {
  id: string;
  fullname: string;
  birthdate: string;
  cpf: string;
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
    tooltip: 'Nome completo do estudante',
  },
  {
    title: 'Data nasc.',
    dataIndex: 'birthdate',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: 'Cpf',
    dataIndex: 'cpf',
    copyable: true,
    ellipsis: true,
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
      <a
        key="editable"
        onClick={() => {
          history.push('/student/' + record.id);
        }}
      >
        Visualizar
      </a>,
    ],
  },
];
const updateData = async () => {
  let res = await studentsService.list();
  console.log(res);

  return { data: res.data };
};
const Students: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [cpf, setCpf] = useState('');
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
                console.log(data);
                if (originalRow.cpf === data.cpf) delete data.cpf;
                let res = await studentsService.update(_id as string, data);
                if (res.success) {
                  message.success('Estudante atualizado com sucesso');
                  return;
                }
                message.error(res.message || 'Erro ao atualizar estudante');
              } catch (error) {
                message.error('Erro ao atualizar estudante');
              }
            },
            onDelete: async (_id) => {
              try {
                let res = await studentsService.delete(_id as string);
                if (res.success) {
                  message.success('Estudante atualizado com sucesso');
                  return;
                }
                message.error(res.message || 'Erro ao atualizar estudante');
              } catch (error) {
                message.error('Erro ao atualizar estudante');
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
          headerTitle="Lista de estudantes"
          toolBarRender={() => [
            <ModalForm<{
              name: string;
              company: string;
            }>
              key="add_token_access"
              title={newToken ? '' : 'Adicionar estudante'}
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

                  const res = await studentsService.create(values);
                  if (res.success) {
                    message.success('Estudante criado com sucesso!');
                    actionRef?.current?.reload();
                    return true;
                  } else {
                    message.error(res.message || 'Falha ao criar Estudante!');
                  }
                } catch (error) {
                  console.log(error);
                  message.error('Falha ao criar Estudante!');
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

                  <ProFormDatePicker
                    width="md"
                    name="birthdate"
                    label="Data de nascimento"
                    placeholder="YYYY-MM-DD"
                    fieldProps={{
                      inputReadOnly: true, // Permite digitação manual
                    }}
                    rules={[{ required: true, message: 'Digite a data de nascimento' }]}
                  />
                  <ProFormText
                    width="md"
                    fieldProps={{
                      value: cpf,
                      onChange: (e) => setCpf(masks.cpfMask(e.target.value)),
                      maxLength: 14, // 000.000.000-00
                    }}
                    name="cpf"
                    label="CPF*"
                    tooltip="Digite o cpf"
                    placeholder="Digite o cpf"
                    rules={[{ required: true, message: 'Digite o cpf' }]}
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
