import { memo } from 'react';
import { formatPopulation } from '../helpers/formatters';
import type { Country } from '../types/country';
import './CountryCard.css';

type CountryCardProps = {
  country: Country;
};

export const CountryCard = memo(({ country }: CountryCardProps) => {
  return (
    <article className="country-card">
      {country.flagUrl ? (
        <div className="country-flag-wrap">
          <img
            src={country.flagUrl}
            alt={country.flagAlt}
            loading="lazy"
            className="country-flag"
          />
        </div>
      ) : null}

      <h2>{country.name}</h2>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Population:</strong> {formatPopulation(country.population)}
      </p>
      <p>
        <strong>Currency:</strong> {country.currency}
      </p>
      <p>
        <strong>Languages:</strong> {country.languages}
      </p>
    </article>
  );
});

CountryCard.displayName = 'CountryCard';
