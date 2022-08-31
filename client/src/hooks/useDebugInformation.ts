import { useEffect, useRef } from 'react';
import useRenderCount from './useRenderCount';
import useUpdateEffect from './useUpdateEffect';

function useDebugInformation(
  componentName: string,
  props: { [key: string]: any }
) {
  const render = useRenderCount();
  const changedProps = useRef({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys({ ...props, ...previousProps });
  changedProps.current = propKeys.reduce((obj, key) => {
    if (props[key] === previousProps.current[key]) return obj;
    return {
      ...obj,
      [key]: {
        previous: previousProps.current[key],
        current: props[key],
      },
    };
  }, {});

  const info = {
    render,
    changedProps: changedProps.current,
    timeSinceLastRender: Date.now() - lastRenderTimestamp.current,
    lastRenderTimestamp: lastRenderTimestamp.current,
  };

  const changes = Object.keys(changedProps.current).length;

  useEffect(() => {
    console.log('[debug-info]', componentName, previousProps.current);
  }, []);

  useUpdateEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    if (changes === 0)
      return console.log('[debug-info]', componentName, 'No changes');
    console.log('[debug-info]', componentName, `Changes: ${changes}`, info);
  });

  return info;
}

export default useDebugInformation;
