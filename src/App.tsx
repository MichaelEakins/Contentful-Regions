import { useEffect, useState } from 'react';
import { Country, fetchAllCities, fetchAllCountries } from './api/countriesNowApi';
import CitySelector from './components/CitySelector';
import ContinentSelector from './components/ContinentSelector';
import CountrySelector from './components/CountrySelector';
import { debug } from './utils/debug';

const App = () => {
  const [continents, setContinents] = useState<string[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);

  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const countriesData = await fetchAllCountries();

        const sortedCountries = countriesData.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);

        const uniqueContinents = Array.from(
          new Set(sortedCountries.map((c) => c.continent))
        ).sort((a, b) => a.localeCompare(b));

        debug('Unique Continents:', uniqueContinents);
        setContinents(uniqueContinents);

        const citiesData = await fetchAllCities();
        const sortedCities = citiesData.sort((a, b) => a.name.localeCompare(b.name));
        setCities(sortedCities);
        setFilteredCities(sortedCities);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  return (
    <div>
      <h1>Dynamic Location Selector</h1>

      <label>Continent:</label>
      <ContinentSelector
        continents={continents}
        selectedContinent={selectedContinent}
        onChange={setSelectedContinent}
      />

      <label>Country:</label>
      <CountrySelector
        countries={filteredCountries.map((c) => c.name)}
        selectedCountry={selectedCountry}
        onChange={setSelectedCountry}
      />

      <label>City:</label>
      <CitySelector
        cities={filteredCities.map((city) => city.name)}
        selectedCity={selectedCity}
        onChange={setSelectedCity}
      />
    </div>
  );
};

export default App;
