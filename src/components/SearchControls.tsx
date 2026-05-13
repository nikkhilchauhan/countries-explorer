import { memo, useCallback, type ChangeEvent } from 'react';
import './SearchControls.css';

type SearchControlsProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  asianOnly: boolean;
  onAsianOnlyChange: (value: boolean) => void;
  resultCount?: number | null;
};

export const SearchControls = memo(
  ({
    searchTerm,
    onSearchTermChange,
    asianOnly,
    onAsianOnlyChange,
    resultCount,
  }: SearchControlsProps) => {
    const handleSearchChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onSearchTermChange(event.target.value);
      },
      [onSearchTermChange],
    );

    const handleAsianToggle = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onAsianOnlyChange(event.target.checked);
      },
      [onAsianOnlyChange],
    );

    return (
      <section className="search-controls" aria-label="Country filters">
        <label htmlFor="country-search" className="search-input-wrapper">
          <span className="sr-only">Search countries by name</span>
          <input
            id="country-search"
            name="country-search"
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by country name..."
            autoComplete="off"
          />
        </label>

        <div className="search-controls-meta">
          {resultCount != null && (
            <span
              className="result-count"
              aria-live="polite"
              aria-atomic="true"
            >
              {resultCount} {resultCount === 1 ? 'country' : 'countries'} found
            </span>
          )}

          <label className="asian-switch" htmlFor="asian-only-switch">
            <span className="asian-switch-label">Asia only?</span>
            <span className="asian-switch-track">
              <input
                id="asian-only-switch"
                type="checkbox"
                className="asian-switch-input"
                checked={asianOnly}
                onChange={handleAsianToggle}
              />
              <span className="asian-switch-thumb" aria-hidden />
            </span>
          </label>
        </div>
      </section>
    );
  },
);

SearchControls.displayName = 'SearchControls';
