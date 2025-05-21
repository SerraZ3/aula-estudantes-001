import DashboardTemplate from '@/components/DashboardTemplate';
import { useModel } from '@umijs/max';
import { Card, Flex } from 'antd';

const Profile: React.FC = () => {
  // const user = initialState?.currentUser;
  const { initialState } = useModel('@@initialState');
  const user = initialState?.currentUser;

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
          <p>Nome: {user && user.fullname}</p>
          <p>E-mail: {user && user.email}</p>
          <p>Permissões: {user && user.role}</p>
        </Card>
      </Flex>
    </DashboardTemplate>
  );
};

export default Profile;
