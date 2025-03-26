import { openModal } from '@/api/modal/modal-slice';
import { RootState } from '@/app/store';
import { usersModalTypes } from '@/constants/modal-types';
import { useDispatch, useSelector } from 'react-redux';
import { UserTableRow } from '../_type';

export const useUsersModals = () => {
  const { createModal, editModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useDispatch();

  const isOpenCreateUsers =
    createModal?.modalId === usersModalTypes.createUsers;
  const isOpenEditUsers = editModal?.modalId === usersModalTypes.editUsers;

  const handleOpenCreateModal = () =>
    dispatch(
      openModal({
        type: 'createModal',
        modalId: usersModalTypes.createUsers,
        data: null,
      }),
    );

  const handleOpenEditModal = (data: UserTableRow) =>
    dispatch(
      openModal({
        type: 'editModal',
        modalId: usersModalTypes.editUsers,
        data,
      }),
    );

  return {
    isOpenCreateUsers,
    isOpenEditUsers,
    handleOpenCreateModal,
    handleOpenEditModal,
  };
};
