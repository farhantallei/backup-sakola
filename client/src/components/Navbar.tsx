import { useLogout } from '@app/features/auth/hooks';
import classNames from 'classnames';
import { useState } from 'react';

export function Navbar() {
  const [active, setActive] = useState(false);
  const { logout } = useLogout();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                alt="Workflow"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  // TODO:  Add event listener to document when open the menu
                  //        for close the menu when user clicked on somewhere else.
                  onClick={() => setActive((prev) => !prev)}>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>

              <div
                className={classNames(
                  !active && 'hidden',
                  'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:bg-opacity-5"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0">
                  Your Profile
                </a>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:bg-opacity-5"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1">
                  Settings
                </a>
                <a
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-black hover:bg-opacity-5"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                  onClick={logout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
