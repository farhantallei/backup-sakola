import { LoginRequest } from '@app/types/rest';
import { LoginForm } from '@auth/components';
import { useLogin } from '@auth/hooks';

function Login() {
  const { mutate, error, isError, isLoading } = useLogin();

  function handleSubmit(form: LoginRequest) {
    mutate(form);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="flex flex-1 flex-col justify-center items-center">
        <h2 className="text-center text-3xl mb-6 tracking-tight font-bold text-gray-900">
          Login
        </h2>
        {isError ? (
          <p className="text-center text-sm -mt-2 mb-4 text-red-600 dark:text-red-500 font-medium">
            {error instanceof Error
              ? error.message
              : 'Something goes wrong. Please refresh your page.'}
          </p>
        ) : null}
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </section>
    </main>
  );
}

export default Login;
