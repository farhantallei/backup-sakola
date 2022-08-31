import { useEffect } from 'react';
import useFirstMountState from './useFirstMountState';

function useUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const isFirstMount = useFirstMountState();
  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
}

export default useUpdateEffect;
