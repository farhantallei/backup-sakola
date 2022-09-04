import { useDashboardContext } from '@app/context/DashboardContext';
import classNames from 'classnames';

interface ContainerProps {
  children?: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  const { isSidebarOpen } = useDashboardContext();
  return (
    <aside
      className={classNames(
        'flex flex-col sticky top-16 basis-80 h-[calc(100vh-4rem)] pt-12 pb-6 border-r overflow-y-auto',
        { ['hidden']: !isSidebarOpen }
      )}>
      {children}
    </aside>
  );
}

export default Container;
