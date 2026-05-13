import { memo } from 'react';
import type { Country } from '../types/country';
import { CountryCard } from './CountryCard';
import './CountryGrid.css';

type CountryGridProps = {
  countries: Country[];
};

export const CountryGrid = memo(({ countries }: CountryGridProps) => {
  return (
    <section className="country-grid" aria-label="Country results">
      {countries.map((country) => (
        <CountryCard
          key={`${country.name}-${country.capital ?? ''}`}
          country={country}
        />
      ))}
    </section>
  );
});

CountryGrid.displayName = 'CountryGrid';
