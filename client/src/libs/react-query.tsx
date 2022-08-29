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
      <ReactQueryDevtools />
    </Provider>
  );
}
