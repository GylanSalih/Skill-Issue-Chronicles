import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import './shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        /*
          Future flags from React Router v6 → v7.
                - v7_startTransition: wraps state updates in React.startTransition for smoother navigation.
      - v7_relativeSplatPath: changes how relative paths inside splat (*) routes are resolved.

      Enabling them early makes the app forward-compatible with React Router v7.
    */
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
