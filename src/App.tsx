import CitySelector from './components/CitySelector';
import ContinentSelector from './components/ContinentSelector';
import CountrySelector from './components/CountrySelector';
import { useCities } from './hooks/useCities';
import { useContinents } from './hooks/useContinents';
import { useCountries } from './hooks/useCountries';

const App = () => {
  const { continents, selectedContinent, setSelectedContinent } = useContinents();
  const { filteredCountries, selectedCountry, setSelectedCountry } = useCountries(selectedContinent);
  const { filteredCities, selectedCity, setSelectedCity } = useCities(selectedCountry);

  return (
    <div>
      <h1>Dynamic Location Selector</h1>

      <label>Continent:</label>
      <ContinentSelector
        continents={continents}
        selectedContinent={selectedContinent}
        onChange={(continent) => {
          setSelectedContinent(continent);
          setSelectedCountry(''); // Reset country when changing continent
        }}
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
