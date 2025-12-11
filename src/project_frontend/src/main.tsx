import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { AuthProvider } from './context/authContext';
import { VoteProvider } from './context/voteContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <VoteProvider>
        <App />
      </VoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
