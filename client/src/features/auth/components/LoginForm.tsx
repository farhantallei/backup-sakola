import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Submit from './Submit';
import TextInput from './TextInput';
import { LoginRequest } from '@app/types/rest';
import { useEffect } from 'react';

interface LoginFormProps {
  onSubmit: (form: LoginRequest) => void;
  isLoading?: boolean;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}

function LoginForm({
  onSubmit,
  isLoading = false,
  setErrorMessage,
}: LoginFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  useEffect(() => {
    if (!setErrorMessage) return;
    if (!!errors.username) {
      if (errors.username.message) {
        setErrorMessage(errors.username.message);
        return;
      }
    }
    if (!!errors.password) {
      if (errors.password.message) {
        setErrorMessage(errors.password.message);
        return;
      }
    }
    setErrorMessage('');
  }, [errors.username, errors.password]);

  return (
    <>
      <DevTool control={control} />
      <form className="-mt-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 md:mt-0 rounded-md shadow-sm -space-y-px">
          <TextInput
            id="username"
            type="text"
            error={!!errors.username}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username minimum length is 3 characters',
              },
            })}
          />
          <TextInput
            id="password"
            type="password"
            error={!!errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password minimum length is 8 characters',
              },
            })}
          />
        </div>
        <div className="mt-4 md:mt-0 flex items-center justify-end">
          <div className="text-sm">
            <a className="font-medium text-blue-600 dark:text-slate-300 dark:font-semibold hover:text-blue-500 dark:hover:text-slate-200 cursor-default">
              Lupa password?
            </a>
          </div>
        </div>
        <Submit isLoading={isLoading} />
      </form>
    </>
  );
}

export default LoginForm;
