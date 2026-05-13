import './Homepage.css';
import { useMemo, useState } from 'react';
import { useCountries } from './hooks/useCountries';
import {
  ErrorState,
  EmptyState,
  ThemeToggle,
  CountryGrid,
  SearchControls,
  CountryGridSkeleton,
} from './components/index';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [asianOnly, setAsianOnly] = useState<boolean>(false);

  const { countries, isLoading, errorMessage } = useCountries(
    searchTerm,
    asianOnly,
  );

  const hasCountries = useMemo(() => countries.length > 0, [countries.length]);

  const isFiltering = searchTerm.trim().length > 0 || asianOnly;

  const resultCount =
    !errorMessage && !isLoading && isFiltering ? countries.length : null;

  return (
    <main className="countries-page">
      <header className="countries-header">
        <div className="countries-header-text">
          <div className="countries-header-title-row">
            <h1>Countries Explorer</h1>
            <ThemeToggle />
          </div>
          <p>Explore Detailed Country Information from Around the World.</p>
        </div>
      </header>

      <SearchControls
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        asianOnly={asianOnly}
        onAsianOnlyChange={setAsianOnly}
        resultCount={resultCount}
      />

      {resultCount != null && (
        <p
          className="result-count-desktop"
          aria-live="polite"
          aria-atomic="true"
        >
          {resultCount} {resultCount === 1 ? 'country' : 'countries'} found
        </p>
      )}

      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      {!errorMessage && isLoading ? <CountryGridSkeleton /> : null}

      {!errorMessage && !isLoading && !hasCountries ? (
        <EmptyState message="No countries found matching your search criteria!" />
      ) : null}

      {!errorMessage && !isLoading && hasCountries ? (
        <CountryGrid countries={countries} />
      ) : null}
    </main>
  );
};

export default HomePage;
