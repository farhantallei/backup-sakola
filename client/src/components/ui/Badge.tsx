import classNames from 'classnames';

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'gray' | 'amber' | 'yellow' | 'green' | 'sky' | 'purple';
  variant?: 'light' | 'filled' | 'outline' | 'dot';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

function Badge({
  children,
  color = 'green',
  variant = 'light',
  size = 'xs',
  rounded = 'full',
  className,
}: BadgeProps) {
  const styles: Record<typeof color, Record<typeof variant, string>> = {
    gray: {
      light: 'bg-gray-100 text-gray-600',
      filled: 'bg-gray-500',
      outline: 'border-gray-200 text-gray-400',
      dot: 'before:bg-gray-500',
    },
    amber: {
      light: 'bg-amber-100 text-amber-600',
      filled: 'bg-amber-500',
      outline: 'border-amber-500 text-amber-500',
      dot: 'before:bg-amber-500',
    },
    yellow: {
      light: 'bg-yellow-100 text-yellow-600',
      filled: 'bg-yellow-500',
      outline: 'border-yellow-500 text-yellow-500',
      dot: 'before:bg-yellow-500',
    },
    green: {
      light: 'bg-green-100 text-green-800',
      filled: 'bg-green-500',
      outline: 'border-green-500 text-green-500',
      dot: 'before:bg-green-500',
    },
    sky: {
      light: 'bg-sky-100 text-sky-500',
      filled: 'bg-sky-500',
      outline: 'border-sky-500 text-sky-500',
      dot: 'before:bg-sky-500',
    },
    purple: {
      light: 'bg-purple-100 text-purple-800',
      filled: 'bg-purple-500',
      outline: 'border-purple-500 text-purple-500',
      dot: 'before:bg-purple-500',
    },
  };

  const sizes: Record<typeof size, string> = {
    xs: 'text-xs leading-5 px-1.5',
    sm: 'text-sm leading-6 px-2',
    base: 'text-base leading-7 px-2.5',
    lg: 'text-lg leading-8 px-3',
    xl: 'text-xl leading-9 px-3.5',
  };

  const radius: Record<typeof rounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const dot: Record<typeof size, string> = {
    xs: 'before:w-1.5 before:h-1.5 before:mr-1.5',
    sm: 'before:w-2 before:h-2 before:mr-2',
    base: 'before:w-2 before:h-2 before:mr-2',
    lg: 'before:w-2.5 before:h-2.5 before:mr-2.5',
    xl: 'before:w-3 before:h-3 before:mr-3',
  };

  return (
    <span
      className={classNames(
        'flex items-center font-semibold border',
        sizes[size],
        styles[color][variant],
        radius[rounded],
        {
          ['border-transparent']: variant === 'light' || variant === 'filled',
          ['text-white']: variant === 'filled',
          [classNames(
            'border-gray-300 text-gray-500 before:block before:rounded-full',
            dot[size]
          )]: variant === 'dot',
        },
        className
      )}>
      {children}
    </span>
  );
}

export default Badge;
