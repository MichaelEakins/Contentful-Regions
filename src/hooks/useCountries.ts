import { useEffect, useMemo, useState } from 'react';
import { Country, fetchAllCountries } from '../api/countriesNowApi';

export const useCountries = (selectedContinent: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  const filteredByContinent = useMemo(() => {
    if (!selectedContinent) return countries;
    return countries.filter((country) => country.continent === selectedContinent);
  }, [selectedContinent, countries]);

  useEffect(() => {
    setFilteredCountries(filteredByContinent);
  }, [filteredByContinent]);

  return { filteredCountries, selectedCountry, setSelectedCountry };
};
