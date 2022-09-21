import classNames from 'classnames';
import { useEffect } from 'react';

interface DropdownsProps {
  active?: boolean;
  handleClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

function Dropdowns({
  active = false,
  handleClose,
  className,
  children,
}: DropdownsProps) {
  useEffect(() => {
    if (active && handleClose)
      document.addEventListener('click', handleClose, { once: true });
  }, [active]);

  return (
    <div
      className={classNames(
        { ['hidden']: !active },
        'absolute right-0 bg-white mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right z-10 focus:outline-none',
        className
      )}>
      <div className="py-1">{children}</div>
    </div>
  );
}

interface DropdownsItemProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  children?: React.ReactNode;
}

function DropdownsItem({ onClick, className, children }: DropdownsItemProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900',
        className
      )}>
      {children}
    </div>
  );
}

Dropdowns.Item = DropdownsItem;
export default Dropdowns;
