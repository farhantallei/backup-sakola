import { Text, Title } from '@app/components/typography';
import { ActionIcon, Badge, Divider } from '@app/components/ui';
import { useDashboardContext } from '@app/context/DashboardContext';
import { AspectRatio } from '@app/layouts';
import { formatDate } from '@app/utils';
import {
  CategoryBadge,
  HighlightBadge,
  LevelBadge,
  StatusBadge,
} from '@course/components/badges';
import useCourse from '@course/hooks/useCourse';
import {
  IconArrowsExchange,
  IconLayoutSidebar,
  IconPencil,
  IconPlus,
  IconRocket,
  TablerIcon,
} from '@tabler/icons';
import { useParams } from 'react-router-dom';

function Course() {
  const { toggleSidebar } = useDashboardContext();
  const { courseId } = useParams() as { courseId: string };

  const { data, isLoading, isError, error } = useCourse(courseId);

  if (isLoading) return null;
  if (isError) {
    if (error instanceof Error)
      return <Text className="text-red-500">{error.message}</Text>;
    return (
      <Text className="text-red-500">
        Something goes wrong. Please refresh your page.
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <ActionIcon
          Icon={IconLayoutSidebar}
          title="Toggle sidebar"
          onClick={toggleSidebar}
        />
        {/* TODO: move this button to bottom. */}
        <ActionIcon Icon={IconPlus} title="Add a new class" color="gray" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <StatusBadge status={data.status} />
          {data.published ? (
            <Badge variant="dot" color="amber">
              Published
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-row gap-2">
          <CategoryBadge category={data.subject?.category} />
          <HighlightBadge
            createdAt={data.createdAt}
            updatedAt={data.updatedAt}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center">[breadcrumbs]</div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-sky-500">
            Done
          </button>
          <button type="button" className="text-sky-500">
            Unpublish
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-9 pb-4">
        <div className="basis-[17.75rem] shrink-0">
          <AspectRatio ratio="16/9">
            <figure className="absolute w-full h-full inset-0">
              <img
                title="Title"
                src={
                  data.thumbnailUrl || '/assets/images/placeholder-image.png'
                }
                className="object-cover w-full h-full"
              />
            </figure>
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-3">
          <LayoutInfo>
            <TitleInfo title="Title" label="Edit" Icon={IconPencil} />
            <Title order={2} className="text-2xl">
              {data.title}
            </Title>
          </LayoutInfo>
          <div className="flex flex-row gap-12">
            <LayoutInfo>
              <TitleInfo
                title="Subject"
                label="Change"
                Icon={IconArrowsExchange}
              />
              {data.subject ? (
                <Text weight={600}>{data.subject.name}</Text>
              ) : (
                <Text size="sm" weight={500} className="text-gray-400 truncate">
                  uncategorized
                </Text>
              )}
            </LayoutInfo>
            <LayoutInfo>
              <TitleInfo
                title="Level"
                label="Change"
                Icon={IconArrowsExchange}
              />
              <LevelBadge level={data.level} />
            </LayoutInfo>
          </div>
          <LayoutInfo>
            <TitleInfo title="Description" label="Edit" Icon={IconPencil} />
            {data.description ? (
              <Text className="text-gray-500">{data.description}</Text>
            ) : (
              <Text className="text-gray-300">Tidak ada deskripsi.</Text>
            )}
          </LayoutInfo>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-full items-center gap-1">
          <IconPlus size={24} className="text-gray-300" />
          <Text className="text-gray-400" size="sm">
            Created at:
          </Text>
          <Divider className="self-stretch">
            {formatDate(new Date(data.createdAt))}
          </Divider>
        </div>
        <div className="flex flex-col w-full items-center gap-1">
          <IconPencil size={24} className="text-gray-300" />
          <Text className="text-gray-400" size="sm">
            Updated at:
          </Text>
          <Divider className="self-stretch">
            {formatDate(new Date(data.updatedAt))}
          </Divider>
        </div>
        {data.publishedAt ? (
          <div className="flex flex-col w-full items-center gap-1">
            <IconRocket size={24} className="text-gray-300" />
            <Text className="text-gray-400" size="sm">
              Published at:
            </Text>
            <Divider className="self-stretch">
              {formatDate(new Date(data.publishedAt))}
            </Divider>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function LayoutInfo({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function TitleInfo({
  title,
  label,
  Icon,
}: {
  title: string;
  label: 'Edit' | 'Change';
  Icon: TablerIcon;
}) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <Text className="text-gray-400" size="sm">
        {title}
      </Text>
      <ActionIcon Icon={Icon} title={label} color="gray" size="sm" />
    </div>
  );
}

export default Course;
