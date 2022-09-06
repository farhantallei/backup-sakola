import { Badge } from '@app/components/ui';

function StatusBadge({ status }: { status: 'berjalan' | 'selesai' }) {
  const badges: Record<typeof status, JSX.Element> = {
    berjalan: (
      <Badge color="sky" variant="dot">
        Berjalan
      </Badge>
    ),
    selesai: (
      <Badge color="green" variant="dot">
        Selesai
      </Badge>
    ),
  };
  return badges[status];
}

export default StatusBadge;
