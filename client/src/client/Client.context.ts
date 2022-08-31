import { createContext, useContext } from 'react';
import { AuthAction } from './Client.reducer';

export interface ClientContextValue {
  setHeader: (token: string) => void;
  isAuthenticated: boolean | null;
  dispatch: React.Dispatch<AuthAction>;
}

const ClientContext = createContext<ClientContextValue>(null!);

export function useClient(): ClientContextValue {
  return useContext(ClientContext) || {};
}

export default ClientContext;
