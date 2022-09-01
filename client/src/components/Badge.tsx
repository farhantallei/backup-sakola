import classNames from 'classnames';

interface BadgeProps {
  children?: React.ReactNode;
  color?: 'green' | 'purple';
}

function Badge({ children, color = 'green' }: BadgeProps) {
  const colors: Record<typeof color, string> = {
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <span
      className={classNames(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        colors[color]
      )}>
      {children}
    </span>
  );
}

export default Badge;
