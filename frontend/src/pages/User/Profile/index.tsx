import DashboardTemplate from '@/components/DashboardTemplate';
import { useModel } from '@umijs/max';
import { Card, Cascader, Checkbox, Collapse, Flex } from 'antd';
import { useState } from 'react';
interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const optionLists: Option[] = [
  {
    value: '1',
    label: 'Materia 1',
    isLeaf: false,
  },
  {
    value: '2',
    label: 'Materia 2',
    isLeaf: false,
  },
  {
    value: '3',
    label: 'Materia 3',
    isLeaf: false,
  },
  {
    value: '4',
    label: 'Materia 4',
    isLeaf: false,
  },

  {
    value: '5',
    label: 'Materia 5',
    isLeaf: false,
  },
];
const Profile: React.FC = () => {
  // const user = initialState?.currentUser;
  const { initialState } = useModel('@@initialState');
  const user = initialState?.currentUser;
  const [options, setOptions] = useState<Option[]>(optionLists);
  // const [responsive] = useState(false);

  return (
    <DashboardTemplate>
      <Flex>
        <Card style={{ width: '50%' }}>
          <p>Nome: {user && user.fullname}</p>
          <p>E-mail: {user && user.email}</p>
          <p>Permissões: {user && user.role}</p>
        </Card>
        <Card style={{ width: '50%' }}>
          <p>Documentos do Estudante</p>
        </Card>
      </Flex>
    </DashboardTemplate>
  );
};

export default Profile;
