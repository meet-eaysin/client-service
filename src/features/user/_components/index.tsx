import PageHeader from '@/components/heading/page-heading';
import DefaultModal from '@/components/modal/default-modal';
import { Separator } from '@/components/ui/separator';
import PageContainer from '@/layouts/root-layout/page-container';
import { useUserContext } from '../context/user-context';
import UserForm from './forms/user-create';
import UsersTable from './user-table';
import { UserView } from './user-view';

const Users = () => {
  const { isCreateOpen, isViewOpen, closeAll, openCreate } = useUserContext();

  return (
    <PageContainer scrollable>
      <PageHeader
        title='Users'
        description='Manage users'
        onAction={openCreate}
        actionLabel='Add New'
      />

      <Separator className='my-3' />

      <UsersTable />

      <DefaultModal
        title='Create Users'
        description='description'
        opened={isCreateOpen}
        onClose={closeAll}
        size='xl'
      >
        <UserForm />
      </DefaultModal>

      <DefaultModal
        title='View User'
        opened={isViewOpen}
        onClose={closeAll}
        size='xl'
      >
        <UserView />
      </DefaultModal>
    </PageContainer>
  );
};

export default Users;
