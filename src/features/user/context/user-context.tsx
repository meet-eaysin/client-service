import { TUser } from '@/features/auth/types';
import { createContext, useContext, useState } from 'react';

type UserContextType = {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isViewOpen: boolean;
  selectedUser: TUser | null;
  openCreate: () => void;
  openEdit: (user: TUser) => void;
  openView: (user: TUser) => void;
  closeAll: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const openCreate = () => {
    closeAll();
    setIsCreateOpen(true);
  };

  const openEdit = (user: TUser) => {
    closeAll();
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const openView = (user: TUser) => {
    closeAll();
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const closeAll = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsViewOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        isCreateOpen,
        isEditOpen,
        isViewOpen,
        selectedUser,
        openCreate,
        openEdit,
        openView,
        closeAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUserContext must be used within UserProvider');
  return context;
};
