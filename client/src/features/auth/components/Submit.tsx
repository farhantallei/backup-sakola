import { Loader } from '@app/components';
import classNames from 'classnames';

interface SubmitProps {
  isLoading: boolean;
}

function Submit({ isLoading }: SubmitProps) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className={classNames(
          'group',
          'relative',
          'w-full',
          'flex',
          'justify-center',
          'py-2',
          'px-4',
          'border',
          'border-transparent',
          'text-sm',
          'font-medium',
          'rounded-md',
          'text-white',
          'bg-blue-600 dark:bg-slate-800',
          'hover:bg-blue-700 dark:hover:bg-slate-900',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-blue-500 dark:focus:ring-slate-500',
          'transition-colors',
          'mt-4 md:mt-0',
          'disabled:bg-blue-400 dark:disabled:bg-slate-800 dark:disabled:opacity-50'
        )}>
        {isLoading ? <Loader /> : 'Masuk'}
      </button>
    </div>
  );
}

export default Submit;
