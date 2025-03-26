// features/user/components/user-view.tsx
'use client';

import { useUserContext } from '../context/user-context';
import { UserStatusBadge } from './user-status-badge';

export const UserView = () => {
  const { selectedUser } = useUserContext();

  if (!selectedUser) return null;

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='text-sm font-medium'>Username</p>
          <p className='text-sm'>{selectedUser.username}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>Email</p>
          <p className='text-sm'>{selectedUser.email}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>Role</p>
          <p className='text-sm capitalize'>{selectedUser.role?.name}</p>
        </div>
        <div>
          <p className='text-sm font-medium'>Status</p>
          <UserStatusBadge status={selectedUser.status} />
        </div>
      </div>
      <div>
        <p className='text-sm font-medium'>Created At</p>
        <p className='text-sm'>
          {new Date(selectedUser.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
