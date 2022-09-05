import { Badge } from '@app/components/ui';

function LevelBadge({
  level,
}: {
  level: 'pemula' | 'menengah' | 'lanjutan' | null;
}) {
  const badges: Record<NonNullable<typeof level>, JSX.Element> = {
    pemula: (
      <Badge color="green" variant="outline" rounded="md">
        Pemula
      </Badge>
    ),
    menengah: (
      <Badge color="amber" variant="outline" rounded="md">
        Menengah
      </Badge>
    ),
    lanjutan: (
      <Badge color="purple" variant="outline" rounded="md">
        Lanjutan
      </Badge>
    ),
  };
  return level ? (
    badges[level]
  ) : (
    <Badge color="gray" variant="outline" rounded="md">
      Unknown
    </Badge>
  );
}

export default LevelBadge;
