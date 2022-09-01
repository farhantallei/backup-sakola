import { FullScreen } from '@app/layouts';
import { LoginRequest } from '@app/types/rest';
import { LoginForm } from '@auth/components';
import { useLogin } from '@auth/hooks';
import { useState } from 'react';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate, error, isError, isLoading } = useLogin();

  function handleSubmit(form: LoginRequest) {
    mutate(form);
  }

  return (
    <FullScreen>
      <div className="max-h-screen min-h-[350px] h-full flex flex-col justify-center max-w-md w-full space-y-8">
        <div className="relative block mb-2">
          <h2 className="text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-100">
            Login
          </h2>
          {isError ? (
            <p className="relative text-center top-2 md:top-auto md:absolute mt-2 right-1 text-sm text-red-600 dark:text-red-500 font-medium">
              {error instanceof Error
                ? error.message
                : 'Something goes wrong. Please refresh your page.'}
            </p>
          ) : null}
          {!!errorMessage ? (
            <p className="relative text-center top-2 md:top-auto md:absolute mt-2 left-1 text-sm text-red-600 dark:text-red-500 font-medium">
              {errorMessage}
            </p>
          ) : null}
        </div>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </FullScreen>
  );
}

export default Login;
