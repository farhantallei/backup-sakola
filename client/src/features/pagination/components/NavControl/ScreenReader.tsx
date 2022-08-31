import { Next, Prev } from '../../types';

function ScreenReader({ nav }: { nav: Prev | Next }) {
  const screenReader: Record<Prev | Next, string> = {
    prev: 'Previous',
    next: 'Next',
  };

  return <span className="sr-only">{screenReader[nav]}</span>;
}

export default ScreenReader;
