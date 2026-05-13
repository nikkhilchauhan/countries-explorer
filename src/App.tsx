import { lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CountriesPageSkeleton } from './components/CountriesPageSkeleton';
const CountriesView = lazy(async () => import('./components/CountriesView'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CountriesPageSkeleton />}>
        <CountriesView />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
