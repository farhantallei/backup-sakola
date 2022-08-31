import classNames from 'classnames';
import { classes } from '../styles';
import { Boundary, Dots, Number, Sibling } from '../types';

type PageControlProps =
  | {
      type: Number | Boundary | Sibling;
      page: number;
      active?: boolean;
      onClick?: () => void;
    }
  | {
      type: Dots;
      page?: never;
      active?: never;
      onClick?: never;
    };

function PageControl({
  type,
  page,
  active = false,
  onClick,
}: PageControlProps) {
  if (type === 'dots') {
    return (
      <span className={classNames(classes.control, classes.dots)}>
        {' ... '}
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={active}
      onClick={onClick}
      className={classNames(classes.control, {
        [classes.sibling]: type === 'sibling',
        [classes.hover]: !active,
        [classes.active]: active,
      })}>
      {page}
    </button>
  );
}

export default PageControl;
