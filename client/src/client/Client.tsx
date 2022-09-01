import axios from 'axios';
import { useReducer, useState } from 'react';
import ClientContext, { ClientContextValue } from './Client.context';
import { authInitialState, authReducer } from './Client.reducer';

interface ClientProviderProps {
  children: React.ReactNode;
}

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/guru`,
  withCredentials: true,
});

function ClientProvider({ children }: ClientProviderProps) {
  const [{ isAuthenticated }, dispatch] = useReducer(
    authReducer,
    authInitialState
  );

  const [client] = useState(api.interceptors);

  // FIXME: The request header can't be changed by parameter variable. Replace with state manager.
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

export default ClientProvider;
