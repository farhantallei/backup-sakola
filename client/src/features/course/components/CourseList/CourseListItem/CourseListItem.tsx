import { Text } from '@app/components/typography';
import { Badge } from '@app/components/ui';
import { useDashboardContext } from '@app/context/DashboardContext';
import { AspectRatio } from '@app/layouts';
import { formatDate } from '@app/utils';
import { IconCirclePlus, IconPencil, IconRocket } from '@tabler/icons';
import { Link } from 'react-router-dom';
import {
  CategoryBadge,
  HighlightBadge,
  LevelBadge,
  StatusBadge,
} from './components';

interface CourseListItemProps {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  subject?: string;
  level: 'pemula' | 'menengah' | 'lanjutan' | null;
  published: boolean;
  status: 'berjalan' | 'selesai';
  category?: 'islam' | 'dunia';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

function CourseListItem({
  id,
  title,
  thumbnailUrl,
  subject,
  level,
  published,
  status,
  category,
  createdAt,
  updatedAt,
  publishedAt,
}: CourseListItemProps) {
  const { closeSidebar } = useDashboardContext();

  return (
    <li>
      <Link
        to={`/pelajaran/${id}`}
        onClick={closeSidebar}
        className="block hover:bg-gray-50">
        <div className="flex flex-row gap-4 p-4">
          <div className="basis-40">
            <AspectRatio ratio="16/9">
              <figure className="absolute w-full h-full inset-0 rounded-md overflow-hidden">
                <img
                  title={title}
                  src={thumbnailUrl || '/assets/images/placeholder-image.png'}
                  className="object-cover w-full h-full"
                />
              </figure>
            </AspectRatio>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-row justify-between">
              <div className="flex flex-col gap-1">
                <Text size="sm" weight={500} className="text-gray-400 truncate">
                  {subject || 'uncategorized'}
                </Text>
                <Text className="text-gray-500">{title}</Text>
              </div>
              <div className="flex flex-row self-start gap-2">
                <CategoryBadge category={category} />
                <HighlightBadge createdAt={createdAt} updatedAt={updatedAt} />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <LevelBadge level={level} />
                <StatusBadge status={status} />
                {published ? (
                  <Badge color="amber" variant="dot">
                    Published
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-row justify-end gap-4">
                {publishedAt ? (
                  <div className="flex flex-row items-center gap-1">
                    <IconRocket size={18} className="text-gray-400" />
                    <Text size="sm" className="text-gray-400">
                      {formatDate(new Date(publishedAt))}
                    </Text>
                  </div>
                ) : null}
                <div className="flex flex-row items-center gap-1">
                  <IconPencil size={18} className="text-gray-400" />
                  <Text size="sm" className="text-gray-400">
                    {formatDate(new Date(updatedAt))}
                  </Text>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <IconCirclePlus size={18} className="text-gray-400" />
                  <Text size="sm" className="text-gray-400">
                    {formatDate(new Date(createdAt))}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CourseListItem;
