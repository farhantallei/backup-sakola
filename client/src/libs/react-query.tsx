import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <Provider client={queryClient}>
      {children}
      {/* DELETE: Remove below element on production mode */}
      <ReactQueryDevtools />
    </Provider>
  );
}
