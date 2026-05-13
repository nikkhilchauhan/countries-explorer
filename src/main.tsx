import './main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
const HomePage = lazy(async () => import('./HomePage'));
import { ErrorBoundary } from './components/ErrorBoundary';
import { CountriesPageSkeleton } from './components/CountriesPageSkeleton';
import { applyTheme, getStoredTheme } from './theme';

applyTheme(getStoredTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<CountriesPageSkeleton />}>
        <HomePage />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
