import { Badge as DefaultBadge } from '@app/components';

interface BadgeProps {
  type: 'new' | 'update';
}

function Badge({ type }: BadgeProps) {
  const types: Record<
    typeof type,
    { color: 'green' | 'purple'; label: string }
  > = {
    new: {
      color: 'green',
      label: 'baru',
    },
    update: {
      color: 'purple',
      label: 'update',
    },
  };

  return (
    <DefaultBadge color={types[type].color}>{types[type].label}</DefaultBadge>
  );
}

export default Badge;
