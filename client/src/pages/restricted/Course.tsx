import { IconLayoutSidebar } from '@tabler/icons';
import { useParams } from 'react-router-dom';

function Course() {
  const { courseId } = useParams() as { courseId: string };

  return (
    <div>
      <IconLayoutSidebar className="text-gray-400" />
      <h1>{courseId}</h1>
    </div>
  );
}

export default Course;
