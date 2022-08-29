import { api } from '@app/services/makeRequest';
import { createContext, useContext, useReducer, useState } from 'react';
import { AuthAction, authInitialState, authReducer } from './Client.reducer';

export interface ClientContextValue {
  setHeader: (token: string) => void;
  isAuthenticated: boolean | null;
  dispatch: React.Dispatch<AuthAction>;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

const ClientContext = createContext<ClientContextValue>(null!);

export function useClient(): ClientContextValue {
  return useContext(ClientContext) || {};
}

export function ClientProvider({ children }: ClientProviderProps) {
  const [{ isAuthenticated }, dispatch] = useReducer(
    authReducer,
    authInitialState
  );

  const [client] = useState(api.interceptors);

  function setHeader(token: string) {
    client.request.use((config) => {
      config.headers!['Authorization'] = `Bearer ${token}`;
      return config;
    });
  }

  const value: ClientContextValue = {
    setHeader,
    isAuthenticated,
    dispatch,
  };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}
