import { useEffect, useState } from 'react';

function useMountedDataEffect<T>(
  effect: React.EffectCallback,
  data: T,
  deps: React.DependencyList = []
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!data) return;
    setMounted(true);
  }, [data]);

  useEffect(() => {
    if (!mounted) return;
    effect();
  }, [mounted, ...deps]);
}

export default useMountedDataEffect;
