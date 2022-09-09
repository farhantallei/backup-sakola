import { useDashboardContext } from '@app/context/DashboardContext';
import { useLogout } from '@auth/hooks';
import { NewCourseModal } from '@course/components';
import { IconPlus } from '@tabler/icons';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Avatar, Badge, SegmentedControl, TextInput } from './ui';

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('islam');
  const { openSidebar } = useDashboardContext();
  const { mutate } = useLogout();

  useEffect(() => {
    if (activeMenu)
      document.addEventListener('click', () => setActiveMenu(false), {
        once: true,
      });
  }, [activeMenu]);

  function handleMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setActiveMenu((prev) => !prev);
  }

  function handleLogout() {
    mutate();
  }

  function closeCourseModal() {
    setCourseModal(false);
  }

  function showCourseModal() {
    setCourseModal(true);
  }

  return (
    <>
      <nav className="flex flex-row flex-shrink-0 basis-16 bg-white border-b sticky top-0 z-10 ">
        <div className="flex basis-80 items-center pl-12">
          <Link
            to="/beranda"
            onClick={openSidebar}
            className="flex items-center gap-2 text-2xl font-bold">
            sakola
            <Badge className="relative top-px" size="base" color="sky">
              author
            </Badge>
          </Link>
        </div>
        <div className="flex flex-1 justify-between px-9">
          <div className="flex items-center gap-4">
            <TextInput className="h-9" type="search" placeholder="Cari..." />
          </div>
          <div className="flex items-center gap-4">
            <SegmentedControl
              value={filterCategory}
              onChange={setFilterCategory}
              data={[
                { label: 'Islam', value: 'islam' },
                { label: 'Dunia', value: 'dunia' },
              ]}
            />
            <ActionIcon
              Icon={IconPlus}
              title="Add a new course"
              size="lg"
              color="gray"
              onClick={showCourseModal}
            />
            <div className="relative">
              <button type="button" title="Profile" onClick={handleMenu}>
                <Avatar />
              </button>
              <div
                className={classNames(
                  { ['hidden']: !activeMenu },
                  'absolute right-0 bg-white mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right z-10 focus:outline-none'
                )}>
                <div className="py-1">
                  <a className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Account settings
                  </a>
                  <a
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {courseModal ? <NewCourseModal handleClose={closeCourseModal} /> : null}
    </>
  );
}

export default Navbar;
