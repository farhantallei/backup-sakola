import classNames from 'classnames';

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'green' | 'purple' | 'sky';
  variant?: 'light' | 'filled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

function Badge({
  children,
  color = 'green',
  variant = 'light',
  size = 'xs',
  className,
}: BadgeProps) {
  const styles: Record<typeof variant, Record<typeof color, string>> = {
    light: {
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      sky: 'bg-sky-100 text-sky-500',
    },
    filled: {
      green: 'bg-green-800',
      purple: 'bg-purple-800',
      sky: 'bg-sky-500',
    },
  };

  const sizes: Record<typeof size, string> = {
    xs: 'text-xs leading-5',
    sm: 'text-sm leading-6',
    md: 'text-base leading-7',
    lg: 'text-lg leading-8',
    xl: 'text-2xl leading-9',
  };

  return (
    <span
      className={classNames(
        'px-2 inline-flex font-semibold rounded-full',
        sizes[size],
        styles[variant][color],
        { ['text-white']: variant === 'filled' },
        className
      )}>
      {children}
    </span>
  );
}

export default Badge;
