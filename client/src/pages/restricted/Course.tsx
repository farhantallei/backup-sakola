import { Text, Title } from '@app/components/typography';
import { ActionIcon, Badge, Divider, Loader } from '@app/components/ui';
import { useDashboardContext } from '@app/context/DashboardContext';
import { useTimeFormatter } from '@app/hooks';
import { AspectRatio } from '@app/layouts';
import {
  CategoryBadge,
  HighlightBadge,
  LevelBadge,
  StatusBadge,
} from '@course/components/badges';
import { useCourse } from '@course/hooks';
import {
  IconArrowsExchange,
  IconLayoutSidebar,
  IconPencil,
  IconPlus,
  IconRocket,
  TablerIcon,
} from '@tabler/icons';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Course() {
  const { openSidebar, closeSidebar, toggleSidebar } = useDashboardContext();
  const { courseId } = useParams() as { courseId: string };
  const location = useLocation();
  const from =
    location.state instanceof Object ? (location.state as Location) : null;
  const { data, isLoading, isFetching, isError, error } = useCourse(courseId);
  const createdDate = useTimeFormatter(data?.createdAt);
  const updatedDate = useTimeFormatter(data?.updatedAt);
  const publishedDate = useTimeFormatter(data?.publishedAt);

  useEffect(() => {
    closeSidebar();
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-full">
      <div className="grid grid-cols-3">
        <ActionIcon
          Icon={IconLayoutSidebar}
          title="Toggle sidebar"
          onClick={toggleSidebar}
        />
        {isLoading || isError ? null : (
          <>
            <div className="flex flex-row gap-2 justify-center items-center">
              <StatusBadge status={data.status} />
              {data.published ? (
                <Badge variant="dot" color="amber">
                  Published
                </Badge>
              ) : null}
            </div>
            <div className="flex flex-row gap-2 justify-end items-center">
              <CategoryBadge category={data.subject?.category} />
              <HighlightBadge
                createdAt={data.createdAt}
                updatedAt={data.updatedAt}
              />
            </div>
          </>
        )}
        {/* TODO: move this button to bottom. */}
        {/* <ActionIcon Icon={IconPlus} title="Add a new class" color="gray" /> */}
      </div>
      <div className="flex flex-row justify-between">
        <div>
          {from == null ? (
            <Link to="/beranda" onClick={openSidebar} className="text-sky-500">
              Home
            </Link>
          ) : (
            <Link to={from} onClick={openSidebar} className="text-sky-500">
              Back
            </Link>
          )}
        </div>
        {isLoading || isError ? null : (
          <div className="flex items-center gap-2 justify-end">
            <button type="button" className="text-sky-500">
              Done
            </button>
            <button type="button" className="text-sky-500">
              {data.published ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center h-full">
          <Loader className="dark:fill-sky-600" />
        </div>
      ) : isError ? (
        <div className="flex flex-1 justify-center items-center h-full">
          {error instanceof Error ? (
            <Title order={2} className="text-red-500">
              {error.message}
            </Title>
          ) : (
            <Title order={2} className="text-red-500">
              Something goes wrong. Please refresh your page.
            </Title>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-row gap-9 pb-4">
            <div className="basis-[17.75rem] shrink-0">
              <AspectRatio ratio="16/9">
                <figure className="absolute w-full h-full inset-0">
                  <img
                    title="Title"
                    src={
                      data.thumbnailUrl ||
                      '/assets/images/placeholder-image.png'
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
                    <Text
                      size="sm"
                      weight={500}
                      className="text-gray-400 truncate">
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
              <Divider className="self-stretch">{createdDate}</Divider>
            </div>
            <div className="flex flex-col w-full items-center gap-1">
              <IconPencil size={24} className="text-gray-300" />
              <Text className="text-gray-400" size="sm">
                Updated at:
              </Text>
              <Divider className="self-stretch">{updatedDate}</Divider>
            </div>
            {data.publishedAt ? (
              <div className="flex flex-col w-full items-center gap-1">
                <IconRocket size={24} className="text-gray-300" />
                <Text className="text-gray-400" size="sm">
                  Published at:
                </Text>
                <Divider className="self-stretch">{publishedDate}</Divider>
              </div>
            ) : null}
          </div>
        </>
      )}
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
