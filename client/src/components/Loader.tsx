import { TwColor } from '@app/types/tailwind';
import classNames from 'classnames';
import { forwardRef } from 'react';

interface LoaderProps extends React.SVGProps<SVGSVGElement> {
  color?: TwColor;
}

export const Loader = forwardRef<SVGSVGElement, LoaderProps>(
  ({ color, className, ...others }, ref) => {
    const colors: Record<TwColor, string> = {
      slate: 'fill-slate-500',
      gray: 'fill-gray-500',
      zinc: 'fill-zinc-500',
      neutral: 'fill-neutral-500',
      stone: 'fill-stone-500',
      red: 'fill-red-500',
      orange: 'fill-orange-500',
      amber: 'fill-amber-500',
      yellow: 'fill-yellow-500',
      lime: 'fill-lime-500',
      green: 'fill-green-500',
      emerald: 'fill-emerald-500',
      teal: 'fill-teal-500',
      cyan: 'fill-cyan-500',
      sky: 'fill-sky-500',
      blue: 'fill-blue-500',
      indigo: 'fill-indigo-500',
      violet: 'fill-violet-500',
      purple: 'fill-purple-500',
      fuchsia: 'fill-fuchsia-500',
      pink: 'fill-pink-500',
      rose: 'fill-rose-500',
    };

    return (
      <svg
        ref={ref}
        width="36px"
        height="9px"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(color ? colors[color] : 'fill-white', 'h-5')}
        role="presentation"
        {...others}>
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"></animate>
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"></animate>
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"></animate>
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"></animate>
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"></animate>
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"></animate>
        </circle>
      </svg>
    );
  }
);
