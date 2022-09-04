import { TablerIcon } from '@tabler/icons';
import classNames from 'classnames';
import { Link, To, useLocation } from 'react-router-dom';

interface SectionItemProps {
  to: To;
  Icon?: TablerIcon;
  children?: React.ReactNode;
}

function SectionItem({ to, Icon, children }: SectionItemProps) {
  const { pathname } = useLocation();

  return (
    <div
      className={classNames(
        'relative w-full px-8 before:absolute before:h-8 before:bg-sky-500 before:w-1.5 before:top-1/2 before:left-0 before:rounded-tr-md before:rounded-br-md before:-translate-y-1/2',
        { ['before:content-none']: to !== pathname }
      )}>
      <Link
        to={to}
        className={classNames(
          'flex flex-row gap-2 px-4 py-3 rounded-xl text-gray-400 font-semibold',
          {
            ['hover:bg-gray-50 hover:bg-opacity-50']: to !== pathname,
            ['bg-gray-100 bg-opacity-50']: to === pathname,
          }
        )}>
        {Icon ? <Icon size={24} /> : null}
        <span>{children}</span>
      </Link>
    </div>
  );
}

export default SectionItem;
