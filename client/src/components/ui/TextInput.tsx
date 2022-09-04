import classNames from 'classnames';
import { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type = 'text', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={classNames(
          'font-semibold bg-gray-100 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-normal placeholder:text-gray-400',
          className
        )}
        {...props}
      />
    );
  }
);

export default TextInput;
