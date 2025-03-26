import { Badge } from '@/components/ui/badge';
import { TUser } from '@/features/auth/types';

export const UserStatusBadge = ({ status }: { status: TUser['status'] }) => {
  const variantMap = {
    active: 'default',
    inactive: 'secondary',
    suspended: 'destructive',
    onleave: 'outline', // Ensure this is included
    pending: 'outline',
  } as const;

  return (
    <Badge
      variant={variantMap[status.toLowerCase() as keyof typeof variantMap]}
      className='capitalize'
    >
      {status}
    </Badge>
  );
};
