import classNames from 'classnames';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps {
  order: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
}

function Title({ order, className, children }: TitleProps) {
  const orders: {
    el: Record<typeof order, Heading>;
    size: Record<typeof order, string>;
  } = {
    el: {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    },
    size: {
      1: 'text-4xl leading-[1.1111111] font-extrabold',
      2: 'text-2xl font-bold',
      3: 'text-xl leading-[1.6] font-semibold',
      4: 'text-base leading-normal font-semibold',
      5: 'text-base',
      6: 'text-base',
    },
  };

  const TitleElement = orders.el[order];

  return (
    <TitleElement className={classNames(orders.size[order], className)}>
      {children}
    </TitleElement>
  );
}

export default Title;
