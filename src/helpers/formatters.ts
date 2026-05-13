import type { Country, CountryApiResponse } from '../types/country';

const DEFAULT_TEXT = 'N/A';

export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population);
};

const formatCurrency = (
  currencyMap: CountryApiResponse['currencies'],
): string => {
  if (!currencyMap) {
    return DEFAULT_TEXT;
  }

  const [firstCurrency] = Object.values(currencyMap);
  if (!firstCurrency?.name) {
    return DEFAULT_TEXT;
  }

  return firstCurrency.symbol
    ? `${firstCurrency.name} (${firstCurrency.symbol})`
    : firstCurrency.name;
};

export const normalizeCountry = (country: CountryApiResponse): Country => {
  const currencies = country.currencies ?? country.currency;
  const languageList = country.languages
    ? Object.values(country.languages)
    : [];

  return {
    name: country.name?.common?.trim() || 'Unknown country',
    capital: country.capital?.[0]?.trim() || DEFAULT_TEXT,
    population: country.population ?? 0,
    currency: formatCurrency(currencies) || DEFAULT_TEXT,
    languages: languageList.length > 0 ? languageList.join(', ') : DEFAULT_TEXT,
    flagUrl: country.flags?.png || country.flags?.svg || '',
    flagAlt:
      country.flags?.alt || `Flag of ${country.name?.common || 'country'}`,
  };
};
