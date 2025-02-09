import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import Details from './Details.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search/1" />} />
        <Route
          path="/search/:page"
          element={
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          }
        >
          <Route path="details/:uid" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
