import { TextInput } from '@app/components/ui';
import { LoginRequest } from '@app/types/rest';
import { DevTool } from '@hookform/devtools';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Submit from './Submit';

interface LoginFormProps {
  onSubmit: (form: LoginRequest) => void;
  isLoading?: boolean;
}

function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  return (
    <>
      <DevTool control={control} />
      <form className="w-60 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              className={classNames('w-full', {
                ['border-red-600']: !!errors.username,
              })}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username minimum length is 3 characters',
                },
              })}
            />
            {errors.username?.message ? (
              <span className="text-sm text-red-500">
                {errors.username.message}
              </span>
            ) : null}
          </div>
          <div>
            <TextInput
              id="password"
              type="password"
              placeholder="Password"
              className={classNames('w-full', {
                ['border-red-600']: !!errors.password,
              })}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password minimum length is 8 characters',
                },
              })}
            />
            {errors.password ? (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center justify-end">
          <a className="text-sm font-medium text-sky-500 hover:text-sky-600  cursor-default">
            Lupa password?
          </a>
        </div>
        <Submit isLoading={isLoading} />
      </form>
    </>
  );
}

export default LoginForm;
