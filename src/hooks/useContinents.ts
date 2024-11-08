import { useEffect, useState } from 'react';
import { fetchAllCountries } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export const useContinents = () => {
  const [continents, setContinents] = useState<string[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  useEffect(() => {
    const loadContinents = async () => {
      try {
        const countriesData = await fetchAllCountries();
        debug('Fetched Countries:', countriesData);

        const uniqueContinents = Array.from(
          new Set(countriesData.map((country) => country.continent).filter(Boolean))
        ).sort();

        debug('Unique Continents:', uniqueContinents);
        setContinents(uniqueContinents);
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    };

    loadContinents();
  }, []);

  return { continents, selectedContinent, setSelectedContinent };
};
