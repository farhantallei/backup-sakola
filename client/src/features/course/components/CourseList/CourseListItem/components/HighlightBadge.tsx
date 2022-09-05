import { Badge } from '@app/components/ui';
import { useMemo } from 'react';

function HighlightBadge({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) {
  const isNew = useMemo((): boolean => {
    const tomorrowDate = new Date().getTime() + 1000 * 3600 * 24;
    return tomorrowDate < new Date(createdAt).getTime();
  }, [createdAt]);

  const isUpdate = useMemo((): boolean => {
    const tomorrowDate = new Date().getTime() + 1000 * 3600 * 24;
    return tomorrowDate < new Date(updatedAt).getTime();
  }, [updatedAt]);

  if (isUpdate) return <Badge color="purple">Update</Badge>;
  if (isNew) return <Badge color="green">Baru</Badge>;
  return null;
}

export default HighlightBadge;
