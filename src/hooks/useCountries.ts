import { useEffect, useMemo, useRef, useState } from 'react';
import { apiHelper } from '../api/apiHelper';
import type { Country } from '../types/country';
import { useDebouncedValue } from './useDebouncedValue';

type UseCountriesResult = {
  countries: Country[];
  isLoading: boolean;
  showSkeleton: boolean;
  errorMessage: string;
};

const SEARCH_DEBOUNCE_MS = 300;
const SKELETON_DELAY_MS = 5000;

export const useCountries = (
  searchTerm: string,
  asianOnly: boolean,
): UseCountriesResult => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const [asiaToggleSkeleton, setAsiaToggleSkeleton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const prevAsianOnlyRef = useRef(asianOnly);
  const fetchGenerationRef = useRef(0);

  const debouncedSearchTerm = useDebouncedValue(
    searchTerm.trim(),
    SEARCH_DEBOUNCE_MS,
  );
  const normalizedSearchTerm = useMemo(
    () => debouncedSearchTerm.toLowerCase(),
    [debouncedSearchTerm],
  );

  useEffect(() => {
    // Increment the fetch generation
    const myGeneration = ++fetchGenerationRef.current;
    const toggledAsianOnly = prevAsianOnlyRef.current !== asianOnly;
    prevAsianOnlyRef.current = asianOnly;

    const controller = new AbortController();
    const skeletonTimeout = window.setTimeout(() => {
      setShowSkeleton(true);
    }, SKELETON_DELAY_MS);

    const loadCountries = async (): Promise<void> => {
      setIsLoading(true);
      setErrorMessage('');
      setShowSkeleton(false);

      if (toggledAsianOnly) {
        setAsiaToggleSkeleton(true);
      } else {
        setAsiaToggleSkeleton(false);
      }

      try {
        const shouldSearch = normalizedSearchTerm.length > 0;
        let result: Country[] = [];

        if (asianOnly) {
          const asianCountries = await apiHelper.getAsianCountries(
            controller.signal,
          );
          result = shouldSearch
            ? asianCountries.filter((country) =>
                country.name.toLowerCase().includes(normalizedSearchTerm),
              )
            : asianCountries;
        } else if (shouldSearch) {
          result = await apiHelper.searchCountriesByName(
            normalizedSearchTerm,
            controller.signal,
          );
        } else {
          result = await apiHelper.getAllCountries(controller.signal);
        }

        setCountries(result);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : 'Unable to fetch countries right now. Please try again!';
        setErrorMessage(message);
        setCountries([]);
      } finally {
        window.clearTimeout(skeletonTimeout);
        setShowSkeleton(false);
        setIsLoading(false);
        if (myGeneration === fetchGenerationRef.current) {
          setAsiaToggleSkeleton(false);
        }
      }
    };

    void loadCountries();

    return () => {
      window.clearTimeout(skeletonTimeout);
      controller.abort();
    };
  }, [normalizedSearchTerm, asianOnly]);

  return {
    countries,
    isLoading,
    showSkeleton: showSkeleton || asiaToggleSkeleton,
    errorMessage,
  };
};
