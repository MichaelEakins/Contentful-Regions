import CitySelector from './components/CitySelector';
import ContinentSelector from './components/ContinentSelector';
import CountrySelector from './components/CountrySelector';
import { useCities } from './hooks/useCities';
import { useContinents } from './hooks/useContinents';
import { useCountries } from './hooks/useCountries';
import "./ReactotronConfig";

const App = () => {
  const { continents, selectedContinent, setSelectedContinent } = useContinents();
  const { countries, selectedCountry, setSelectedCountry } = useCountries(selectedContinent);
  const { filteredCities, selectedCity, setSelectedCity } = useCities(selectedCountry, selectedContinent);

  return (
    <div>
      <h1>Dynamic Location Selector</h1>

      <label>Continent:</label>
      <ContinentSelector
        continents={continents}
        selectedContinent={selectedContinent}
        onChange={(continent) => {
          setSelectedContinent(continent);
          setSelectedCountry('');
          setSelectedCity('');
        }}
      />

      <label>Country:</label>
      <CountrySelector
        countries={countries.map((c) => c.name)}
        selectedCountry={selectedCountry}
        onChange={(country) => {
          setSelectedCountry(country);
          setSelectedCity('');
        }}
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
