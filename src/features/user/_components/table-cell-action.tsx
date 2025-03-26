import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TUser } from '@/features/auth/types';
import { Copy, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { useDeleteUser } from '../api/user-queries';
import { useUserContext } from '../context/user-context';

export const CellAction = ({ user }: { user: TUser }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const { openEdit, openView } = useUserContext();
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDelete = async () => {
    await deleteUser(user.id);
    setOpenDelete(false);
  };

  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        loading={isPending}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            <Copy className='mr-2 h-4 w-4' />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openView(user)}>
            <Eye className='mr-2 h-4 w-4' />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openEdit(user)}>
            <Edit className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onClick={() => setOpenDelete(true)}
          >
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
