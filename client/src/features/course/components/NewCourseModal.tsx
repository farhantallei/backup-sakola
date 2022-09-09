import { Modal } from '@app/components';
import { Text } from '@app/components/typography';
import { TextInput } from '@app/components/ui';
import { CreateCourseRequest } from '@app/types/rest';
import { DevTool } from '@hookform/devtools';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useCreateCourse } from '../hooks';

interface NewCourseModalProps {
  handleClose: () => void;
}

function NewCourseModal({ handleClose }: NewCourseModalProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseRequest>();
  const { mutateAsync: createCourse, isLoading, error } = useCreateCourse();

  async function handleCreateCourse({ title }: CreateCourseRequest) {
    try {
      await createCourse({ title: !title ? 'Untitled course' : title });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DevTool control={control} />
      <Modal
        title="Create a new Course"
        submitLabel="Create"
        onSubmit={handleSubmit(handleCreateCourse)}
        onClose={handleClose}
        onEnter={handleSubmit(handleCreateCourse)}
        onEscape={handleClose}
        isLoading={isLoading}
        error={error}
        className="mt-4">
        <label htmlFor="course-title">
          {errors.title && errors.title.message ? (
            <Text
              size="xs"
              weight={700}
              transform="uppercase"
              className="text-red-600">
              {errors.title.message}
            </Text>
          ) : (
            <Text
              size="xs"
              weight={700}
              transform="uppercase"
              className="text-gray-400">
              Title
            </Text>
          )}
        </label>
        <TextInput
          id="course-title"
          placeholder="Untitled course"
          variant="standard"
          className={classNames('w-full', {
            ['border-red-600 focus:border-red-600']: !!errors.title,
          })}
          autoFocus
          {...register('title', {
            minLength: {
              value: 3,
              message: 'Title minimum length is 3 characters',
            },
          })}
        />
      </Modal>
    </>
  );
}

export default NewCourseModal;
