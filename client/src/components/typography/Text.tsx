import classNames from 'classnames';

interface TextProps {
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  weight?: 200 | 300 | 400 | 500 | 600 | 700 | 800;
  transform?:
    | 'none'
    | 'capitalize'
    | 'lowercase'
    | 'uppercase'
    | 'sentencecase';
  align?: 'left' | 'right' | 'center' | 'end' | 'start' | 'justify';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function Text({
  size = 'base',
  weight = 400,
  transform = 'none',
  align = 'start',
  italic = false,
  underline = false,
  strikethrough = false,
  className,
  children,
}: TextProps) {
  const styles: {
    sizes: Record<typeof size, string>;
    weights: Record<typeof weight, string>;
    transforms: Record<typeof transform, string>;
    aligns: Record<typeof align, string>;
  } = {
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    weights: {
      200: 'font-extralight',
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
    },
    transforms: {
      none: 'normal-case',
      capitalize: 'capitalize',
      lowercase: 'lowercase',
      uppercase: 'uppercase',
      sentencecase: 'first-letter:uppercase',
    },
    aligns: {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
      end: 'text-end',
      start: 'text-start',
      justify: 'text-justify',
    },
  };

  return (
    <div
      className={classNames(
        styles.sizes[size],
        styles.weights[weight],
        styles.transforms[transform],
        styles.aligns[align],
        {
          ['italic']: italic,
          ['underline']: underline,
          ['line-through']: strikethrough,
        },
        className
      )}>
      {children}
    </div>
  );
}

export default Text;
