import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
import queryClient from './queryClient.ts';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement !== null && rootElement !== undefined) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
