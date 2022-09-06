import classNames from 'classnames';
import { CSSProperties } from 'react';

interface NavigationProgressProps {
  progress: number;
  running: boolean;
  end: boolean;
}

function NavigationProgress({
  progress,
  running,
  end,
}: NavigationProgressProps) {
  const transformProperties = {
    transform: `translate3d(${progress - 100}%, 0, 0)`,
  } as CSSProperties;

  return (
    <div
      style={transformProperties}
      className={classNames(
        'fixed top-0 left-0 w-full h-[3px] bg-sky-500 opacity-0 transition-[transform] ease-in pointer-events-none z-20',
        'after:absolute after:top-0 after:right-0 after:w-[100px] after:h-full after:bg-sky-500 after:shadow-[0_0_15px,_0_0_5px] after:shadow-sky-500 after:opacity-0 after:rotate-2 after:-translate-y-[2px]',
        {
          ['opacity-100 duration-[2500ms] ease-in-out']: running,
          ['z-20 opacity-100 animate-navigation-progress-finish after:animate-navigation-progress-after']:
            end,
        }
      )}
    />
  );
}

export default NavigationProgress;
