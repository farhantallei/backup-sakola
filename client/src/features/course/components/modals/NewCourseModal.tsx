import { Modal } from '@app/components';
import { Text } from '@app/components/typography';
import { TextInput } from '@app/components/ui';
import { CreateCourseRequest } from '@app/types/rest';
import { useCreateCourse } from '@course/hooks';
import { DevTool } from '@hookform/devtools';
import { IconFilePlus } from '@tabler/icons';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

interface NewCourseModalProps {
  open: boolean;
  handleClose: () => void;
}

function NewCourseModal({ open, handleClose }: NewCourseModalProps) {
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
      {open ? <DevTool control={control} /> : null}
      <Modal
        open={open}
        title="Create a new Course"
        Icon={IconFilePlus}
        submitLabel="Create"
        onSubmit={handleSubmit(handleCreateCourse)}
        onClose={handleClose}
        isLoading={isLoading}
        error={error}
        closeOnClickOutside={false}
        withCloseButton={false}>
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
