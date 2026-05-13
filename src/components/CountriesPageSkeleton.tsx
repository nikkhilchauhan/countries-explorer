import { ThemeToggle } from './ThemeToggle';
import { CountryGridSkeleton } from './CountryGridSkeleton';
import './CountriesView.css';
import './CountriesPageSkeleton.css';

export function CountriesPageSkeleton() {
  return (
    <main
      className="countries-page"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading countries explorer"
    >
      <header className="countries-header">
        <div className="countries-header-text">
          <div className="countries-header-title-row">
            <h1>Countries Explorer</h1>
            <ThemeToggle />
          </div>
          <p>Explore Detailed Country Information from Around the World.</p>
        </div>
      </header>

      <section className="countries-shell-search-skeleton" aria-hidden="true">
        <div className="countries-shell-search-field-skel" />
        <div className="countries-shell-asia-skel">
          <div className="countries-shell-asia-label-skel" />
          <div className="countries-shell-asia-track-skel" />
        </div>
      </section>

      <CountryGridSkeleton />
    </main>
  );
}
