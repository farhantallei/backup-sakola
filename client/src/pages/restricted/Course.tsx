import placeholderImage from '@app/assets/images/placeholder-image.png';
import { Text, Title } from '@app/components/typography';
import { ActionIcon, Badge, Divider } from '@app/components/ui';
import { AspectRatio } from '@app/layouts';
import {
  IconArrowsExchange,
  IconPencil,
  IconPlus,
  IconRocket,
  TablerIcon,
} from '@tabler/icons';
import { useParams } from 'react-router-dom';

function Course() {
  const { courseId } = useParams() as { courseId: string };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="dot" color="amber">
            published
          </Badge>
        </div>
        <div>
          <Badge color="purple">Dunia</Badge>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center">Matematika Dasar</div>
        <div className="flex items-center gap-2">
          <button type="button" className="text-sky-500">
            Edit
          </button>
          <button type="button" className="text-sky-500">
            Unpublish
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-8 pb-4">
        <div className="basis-72 shrink-0">
          <AspectRatio ratio="16/9">
            <figure className="absolute w-full h-full inset-0">
              <img
                title="Title"
                src={placeholderImage}
                className="object-cover w-full h-full"
              />
            </figure>
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-3">
          <LayoutInfo>
            <TitleInfo title="Title" label="Edit" Icon={IconPencil} />
            <Title order={2} className="text-2xl">
              Matematika Dasar
            </Title>
          </LayoutInfo>
          <div className="flex flex-row gap-12">
            <LayoutInfo>
              <TitleInfo
                title="Subject"
                label="Change"
                Icon={IconArrowsExchange}
              />
              <Text weight={600}>Matematika</Text>
            </LayoutInfo>
            <LayoutInfo>
              <TitleInfo
                title="Level"
                label="Change"
                Icon={IconArrowsExchange}
              />
              <Badge variant="outline" rounded="md">
                Beginner
              </Badge>
            </LayoutInfo>
          </div>
          <LayoutInfo>
            <TitleInfo title="Description" label="Edit" Icon={IconPencil} />
            <Text className="text-gray-500">
              In sit vulputate lorem vel aliquet vitae adipiscing. Amet neque
              massa vitae semper quis id sit.
            </Text>
          </LayoutInfo>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-full items-center gap-1">
          <IconPlus size={24} className="text-gray-300" />
          <Text className="text-gray-400" size="sm">
            Created at:
          </Text>
          <Divider className="self-stretch">9 June 2022</Divider>
        </div>
        <div className="flex flex-col w-full items-center gap-1">
          <IconPencil size={24} className="text-gray-300" />
          <Text className="text-gray-400" size="sm">
            Updated at:
          </Text>
          <Divider className="self-stretch">3 jam yang lalu</Divider>
        </div>
        <div className="flex flex-col w-full items-center gap-1">
          <IconRocket size={24} className="text-gray-300" />
          <Text className="text-gray-400" size="sm">
            Published at:
          </Text>
          <Divider className="self-stretch">1 menit yang lalu</Divider>
        </div>
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
