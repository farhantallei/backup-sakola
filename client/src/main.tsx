import { ClientProvider } from '@app/client';
import { ReactQueryProvider } from '@app/libs/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <ClientProvider>
          <App />
        </ClientProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
