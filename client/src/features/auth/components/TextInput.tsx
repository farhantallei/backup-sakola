import { toSentenceCase } from '@app/utils';
import classNames from 'classnames';
import { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: 'username' | 'password';
  error?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, error, className, onChange, ...others }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="sr-only">
          {toSentenceCase(id)}
        </label>
        <input
          ref={ref}
          placeholder={toSentenceCase(id)}
          onChange={onChange}
          className={classNames(
            'appearance-none',
            'rounded-none',
            'relative',
            'block',
            'dark:bg-slate-600',
            'w-full',
            'px-3',
            'py-2',
            'border',
            'border-gray-300 dark:border-slate-700',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'text-gray-900 dark:text-gray-200',
            id === 'username' ? 'rounded-t-md' : 'rounded-b-md',
            'focus:outline-none',
            'focus:ring-blue-500 dark:focus:ring-slate-500',
            'focus:border-blue-500 dark:focus:border-slate-500',
            'focus:z-10',
            'sm:text-sm',
            {
              ['z-10 focus:z-20 border-red-600 dark:border-red-600']: !!error,
            },
            className
          )}
          {...others}
        />
      </div>
    );
  }
);

export default TextInput;
