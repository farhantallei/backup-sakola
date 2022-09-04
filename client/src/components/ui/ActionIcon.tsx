import { TablerIcon } from '@tabler/icons';
import classNames from 'classnames';

interface ActionIconProps {
  Icon: TablerIcon;
  title: string;
  color?: 'gray' | 'red' | 'amber' | 'blue';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  iconSize?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function ActionIcon({
  Icon,
  title,
  color = 'blue',
  size = 'base',
  iconSize,
  className,
  onClick,
}: ActionIconProps) {
  const colors: Record<typeof color, string> = {
    gray: 'text-gray-500 hover:bg-gray-100',
    red: 'text-red-500 hover:bg-red-100',
    amber: 'text-amber-500 hover:bg-amber-100',
    blue: 'text-blue-500 hover:bg-blue-100',
  };

  const styles: {
    areas: Record<typeof size, string>;
    sizes: Record<typeof size, number>;
  } = {
    areas: {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      base: 'w-6 h-6',
      lg: 'w-7 h-7',
      xl: 'w-7 h-7',
      '2xl': 'w-8 h-8',
    },
    sizes: {
      xs: 12,
      sm: 14,
      base: 18,
      lg: 24,
      xl: 32,
      '2xl': 42,
    },
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={classNames(
        styles.areas[size],
        'relative flex justify-center items-center rounded cursor-pointer',
        colors[color],
        className
      )}>
      <Icon size={iconSize || styles.sizes[size]} />
    </button>
  );
}

export default ActionIcon;
