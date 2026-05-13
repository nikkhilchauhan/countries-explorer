import { normalizeCountry } from '../helpers/formatters';
import type { Country, CountryApiResponse } from '../types/country';

const API_BASE_URL = 'https://restcountries.com/v3.1';
const API_FIELDS = 'name,flags,capital,population,currencies,languages';
const API_TIMEOUT_MS = 5000;
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 500;

type RequestOptions = {
  signal?: AbortSignal;
  emptyOnNotFound?: boolean;
};

const isAbortError = (error: unknown): boolean => {
  return error instanceof DOMException && error.name === 'AbortError';
};

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

const requestOnce = async (
  endpoint: string,
  options: RequestOptions,
): Promise<Country[]> => {
  const timeoutController = new AbortController();
  const combinedController = new AbortController();

  const timeoutId = window.setTimeout(() => {
    timeoutController.abort();
  }, API_TIMEOUT_MS);

  const abortCombinedController = (): void => {
    if (!combinedController.signal.aborted) {
      combinedController.abort();
    }
  };

  timeoutController.signal.addEventListener('abort', abortCombinedController);
  options.signal?.addEventListener('abort', abortCombinedController);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: combinedController.signal,
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      if (options.emptyOnNotFound && response.status === 404) {
        return [];
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as CountryApiResponse[];
    return data.map(normalizeCountry);
  } catch (error) {
    if (isAbortError(error)) {
      if (timeoutController.signal.aborted) {
        throw new Error('Request timed out. Please try again.', {
          cause: error,
        });
      }
      throw error;
    }
    throw new Error('Unable to fetch countries right now. Please try again!', {
      cause: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
    timeoutController.signal.removeEventListener(
      'abort',
      abortCombinedController,
    );
    options.signal?.removeEventListener('abort', abortCombinedController);
  }
};

const request = async (
  endpoint: string,
  options: RequestOptions = {},
): Promise<Country[]> => {
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      return await requestOnce(endpoint, options);
    } catch (error) {
      if (isAbortError(error)) throw error;

      const isLastAttempt = attempt === MAX_RETRIES - 1;
      if (isLastAttempt) throw error;

      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
      await wait(delay);
      attempt++;
    }
  }

  throw new Error('Unable to fetch countries right now. Please try again!');
};

export const apiHelper = {
  getAllCountries(signal?: AbortSignal): Promise<Country[]> {
    return request(`/all?fields=${API_FIELDS}`, { signal });
  },
  getAsianCountries(signal?: AbortSignal): Promise<Country[]> {
    return request(`/region/asia?fields=${API_FIELDS}`, { signal });
  },
  searchCountriesByName(
    searchTerm: string,
    signal?: AbortSignal,
  ): Promise<Country[]> {
    return request(
      `/name/${encodeURIComponent(searchTerm.trim())}?fields=${API_FIELDS}`,
      { signal, emptyOnNotFound: true },
    );
  },
};
