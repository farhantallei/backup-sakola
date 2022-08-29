import { toCapitalize } from '@app/utils';
import classNames from 'classnames';

interface TextInputProps {
  type: 'username' | 'password';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({ type, onChange }: TextInputProps) {
  return (
    <div>
      <label htmlFor={type} className="sr-only">
        {toCapitalize(type)}
      </label>
      <input
        id={type}
        name={type}
        type={type === 'password' ? 'password' : 'text'}
        placeholder={toCapitalize(type)}
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
          type === 'username' ? 'rounded-t-md' : 'rounded-b-md',
          'focus:outline-none',
          'focus:ring-blue-500 dark:focus:ring-slate-500',
          'focus:border-blue-500 dark:focus:border-slate-500',
          'focus:z-10',
          'sm:text-sm'
        )}
      />
    </div>
  );
}
