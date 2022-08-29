import { FullScreen } from '@app/layouts';
import { LoginForm } from '@app/types';
import { Submit, TextInput } from '@auth/components';
import { useLogin } from '@auth/hooks';
import { useState } from 'react';

export function Login() {
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const { login, error, isError, isLoading } = useLogin();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: Implement form validation

    login(form);
  }

  return (
    <FullScreen>
      <div className="max-w-md w-full space-y-8">
        <div className="relative block mb-10">
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-100">
            Login
          </h2>
          {isError ? (
            <p className="absolute mt-2 left-1/2 -translate-x-1/2 text-sm text-red-600 dark:text-red-500 font-medium">
              {error}
            </p>
          ) : null}
        </div>
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput type="username" onChange={handleChange} />
            <TextInput type="password" onChange={handleChange} />
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a className="font-medium text-blue-600 dark:text-slate-800 dark:font-semibold hover:text-blue-500 dark:hover:text-slate-900 cursor-default">
                Lupa password?
              </a>
            </div>
          </div>
          <Submit isLoading={isLoading} />
        </form>
      </div>
    </FullScreen>
  );
}
