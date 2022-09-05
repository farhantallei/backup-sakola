import { Badge } from '@app/components/ui';

function CategoryBadge({ category }: { category?: 'islam' | 'dunia' }) {
  const badges: Record<NonNullable<typeof category>, JSX.Element> = {
    islam: <Badge color="sky">Islam</Badge>,
    dunia: <Badge color="purple">Dunia</Badge>,
  };
  return category ? badges[category] : null;
}

export default CategoryBadge;
