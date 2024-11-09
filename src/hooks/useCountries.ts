import { useEffect, useState } from 'react';
import { Country, fetchAllCountries } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export const useCountries = (selectedContinent: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cachedCountries, setCachedCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCachedCountries(data);
        setCountries(data); // Initially show all countries
        debug('Loaded and Cached Countries:', data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!selectedContinent) {
      setCountries(cachedCountries); // Reset to all countries if no continent is selected
    } else {
      setCountries(cachedCountries.filter((country) => country.continent === selectedContinent));
    }
  }, [selectedContinent, cachedCountries]);

  return { countries, selectedCountry, setSelectedCountry };
};
