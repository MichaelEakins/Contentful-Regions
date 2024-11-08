import CitySelector from './components/CitySelector';
import ContinentSelector from './components/ContinentSelector';
import CountrySelector from './components/CountrySelector';
import { useCities } from './hooks/useCities';
import { useContinents } from './hooks/useContinents';
import { useCountries } from './hooks/useCountries';
import { debug } from './utils/debug';

const App = () => {
  const { continents, selectedContinent, setSelectedContinent } = useContinents();
  const { filteredCountries, selectedCountry, setSelectedCountry } =
    useCountries(selectedContinent);
  const { filteredCities, selectedCity, setSelectedCity } = useCities(selectedCountry);
  debug('Filtered continents:', continents);
  debug('Filtered countries:', filteredCountries);
  debug('Filtered Cities:', filteredCities);

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
        cities={filteredCities.map((city) => city.city)} 
        selectedCity={selectedCity}
        onChange={setSelectedCity}
      />
    </div>
  );
};

export default App;
