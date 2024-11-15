import { useEffect, useState } from 'react';
import { fetchAllCountries } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export const useContinents = () => {
  const [continents, setContinents] = useState<string[]>([]);
  const [cachedContinents, setCachedContinents] = useState<string[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  useEffect(() => {
    const loadContinents = async () => {
      try {
        const countriesData = await fetchAllCountries();
        debug('Fetched Countries:', countriesData);

        const uniqueContinents = Array.from(
          new Set(
            countriesData.map((country) => 
              country.continent === 'Oceania' ? 'Australia' : country.continent
            ).filter(Boolean)
          )
        ).sort();

        setCachedContinents(uniqueContinents);
        setContinents(uniqueContinents);
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    };

    loadContinents();
  }, []);

  return { continents, cachedContinents, selectedContinent, setSelectedContinent };
};
