import classNames from 'classnames';
import { classes } from '../../styles';
import { Next, Prev } from '../../types';
import NavLabel from './NavLabel';
import ScreenReader from './ScreenReader';

interface NavControlProps {
  nav: Prev | Next;
  disabled?: boolean;
  onClick?: () => void;
}

function NavControl({ nav, disabled = false, onClick }: NavControlProps) {
  const title: Record<Prev | Next, string> = {
    prev: 'Previous',
    next: 'Next',
  };

  return (
    <button
      title={title[nav]}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classNames(classes.control, classes.nav, classes.hover, {
        ['rounded-l-md']: nav === 'prev',
        ['rounded-r-md']: nav === 'next',
        [classes.disabled]: disabled,
      })}>
      <ScreenReader nav={nav} />
      <NavLabel nav={nav} />
    </button>
  );
}

export default NavControl;
