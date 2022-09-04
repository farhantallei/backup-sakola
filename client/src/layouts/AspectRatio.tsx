import classNames from 'classnames';

interface AspectRatioProps {
  ratio: '16/9';
  className?: string;
  children?: React.ReactNode;
}

function AspectRatio({ ratio, className, children }: AspectRatioProps) {
  const ratios: Record<typeof ratio, string> = {
    '16/9': 'before:pb-[calc(1/(16/9)*100%)]',
  };

  return (
    <div
      className={classNames(
        'relative before:block before:h-0',
        ratios[ratio],
        className
      )}>
      {children}
    </div>
  );
}

export default AspectRatio;
