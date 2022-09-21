import { useDashboardContext } from '@app/context/DashboardContext';
import { useLogout } from '@auth/hooks';
import { NewCourseModal } from '@course/components/modals';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ActionIcon,
  Avatar,
  Badge,
  Dropdowns,
  SegmentedControl,
  TextInput,
} from './ui';

function Navbar() {
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('islam');
  const { openSidebar } = useDashboardContext();
  const { mutate } = useLogout();

  function handleSettingsMenu(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    setSettingsMenu((prev) => !prev);
  }

  function handleLogout() {
    mutate();
  }

  function closeNewCourseModal() {
    setIsNewCourseModalOpen(false);
  }

  function openNewCourseModal() {
    setIsNewCourseModalOpen(true);
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
              onClick={openNewCourseModal}
            />
            <div className="relative">
              <button
                type="button"
                title="Profile"
                onClick={handleSettingsMenu}>
                <Avatar />
              </button>
              <Dropdowns
                active={settingsMenu}
                handleClose={() => setSettingsMenu(false)}>
                <Dropdowns.Item>Account settings</Dropdowns.Item>
                <Dropdowns.Item onClick={handleLogout}>Logout</Dropdowns.Item>
              </Dropdowns>
            </div>
          </div>
        </div>
      </nav>
      <NewCourseModal
        open={isNewCourseModalOpen}
        handleClose={closeNewCourseModal}
      />
    </>
  );
}

export default Navbar;
