import { useEffect, useMemo, useState } from 'react';
import { fetchAllCities } from '../api/countriesNowApi';
import { debug } from '../utils/debug';

export const useCities = (selectedCountry: string) => {
  const [cities, setCities] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchAllCities(); // Fetches city data in the format provided
        debug('Fetched Cities:', data);
        setCities(data);
        setFilteredCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    loadCities();
  }, []);

  const filteredByCountry = useMemo(() => {
    if (!selectedCountry) return cities;
    return cities.filter((city) => city.country === selectedCountry);
  }, [selectedCountry, cities]);

  useEffect(() => {
    setFilteredCities(filteredByCountry);
  }, [filteredByCountry]);

  return { filteredCities, selectedCity, setSelectedCity };
};
