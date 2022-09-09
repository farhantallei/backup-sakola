import classNames from 'classnames';
import { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'standard' | 'outline';
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ variant = 'outline', type = 'text', className, ...props }, ref) => {
    const variants: Record<typeof variant, string> = {
      standard:
        'border-t-0 border-l-0 border-r-0 border-gray-200 px-0 focus:ring-0',
      outline: 'bg-gray-100 rounded-lg border-gray-200',
    };

    return (
      <input
        ref={ref}
        type={type}
        className={classNames(
          'font-semibold focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-normal placeholder:text-gray-400',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

export default TextInput;
