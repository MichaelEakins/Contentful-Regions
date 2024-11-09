import { useEffect, useState } from 'react';
import { Country, fetchAllCountries } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export const useCountries = (selectedContinent: string) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        debug('Loaded Countries:', data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!selectedContinent) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) => country.continent === selectedContinent
      );
      setFilteredCountries(filtered);
      debug(`Filtered Countries for ${selectedContinent}:`, filtered);

      setSelectedCountry('');
    }
  }, [selectedContinent, countries]);

  return { filteredCountries, selectedCountry, setSelectedCountry };
};
