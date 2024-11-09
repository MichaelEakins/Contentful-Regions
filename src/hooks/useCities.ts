import { useEffect, useState } from 'react';
import { fetchAllCities } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export interface City {
  city: string;
  country: string;
  continent?: string;
}

export const useCities = (selectedCountry: string, selectedContinent: string) => {
  const [cachedCities, setCachedCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data: City[] = await fetchAllCities();
        setCachedCities(data);
        setFilteredCities(data); // Initialize with all cities
        debug('Cached Cities:', data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const filtered = cachedCities.filter((city) => city.country === selectedCountry);
      setFilteredCities(filtered);
    } else if (selectedContinent) {
      const filtered = cachedCities.filter((city) => city.continent === selectedContinent);
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cachedCities); // Reset to all cities
    }
  }, [selectedCountry, selectedContinent, cachedCities]);

  return { filteredCities, selectedCity, setSelectedCity };
};
