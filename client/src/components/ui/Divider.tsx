import classNames from 'classnames';

interface DividerProps {
  variant?: 'dashed' | 'dotted' | 'solid';
  className?: string;
  children?: React.ReactNode;
}

function Divider({ variant = 'solid', className, children }: DividerProps) {
  const variants: {
    noLabel: Record<typeof variant, string>;
    withLabel: Record<typeof variant, string>;
  } = {
    noLabel: {
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      solid: 'border-solid',
    },
    withLabel: {
      dashed: 'before:border-dashed after:border-dashed',
      dotted: 'before:border-dotted after:border-dotted',
      solid: 'before:border-solid after:border-solid',
    },
  };

  return (
    <div
      className={classNames(
        {
          [classNames('border-t-2 border-gray-100', variants.noLabel[variant])]:
            !children,
          [classNames(
            'flex flex-row items-center text-sm text-gray-500 font-medium before:flex-1 before:h-px before:border-t-2 before:border-gray-100 before:mr-2 after:flex-1 after:h-px after:border-t-2 after:border-gray-100 after:ml-2',
            variants.withLabel[variant]
          )]: !!children,
        },
        className
      )}>
      {children}
    </div>
  );
}

export default Divider;
