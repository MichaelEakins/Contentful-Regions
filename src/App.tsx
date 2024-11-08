import React, { useEffect, useState } from 'react';

interface Country {
  name: { common: string; official: string };
  region: string; // Continent
  subregion: string;
  capital: string[];
  population: number;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
}

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<string[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        // Extract unique continents
        const uniqueContinents = Array.from(new Set(data.map((c: Country) => c.region)));
        setContinents(uniqueContinents);

        // Initially, show all countries
        setFilteredCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleContinentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedContinent(selected);
    setSelectedCountry(''); // Reset country selection

    if (selected) {
      const filtered = countries.filter((c) => c.region === selected);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const selectedCountryDetails = filteredCountries.find(
    (country) => country.name.common === selectedCountry
  );

  return (
    <div>
      <h1>Dynamic Country Data Selector</h1>

      <label>Continent:</label>
      <select value={selectedContinent} onChange={handleContinentChange}>
        <option value="">Select a continent</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>

      <label>Country:</label>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        {filteredCountries.map((country) => (
          <option key={country.name.common} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      {selectedCountryDetails && (
        <div>
          <h2>Details for {selectedCountryDetails.name.common}</h2>
          <p>
            <strong>Capital:</strong> {selectedCountryDetails.capital?.[0] || 'N/A'}
          </p>
          <p>
            <strong>Population:</strong> {selectedCountryDetails.population.toLocaleString()}
          </p>
          <p>
            <strong>Languages:</strong>{' '}
            {Object.values(selectedCountryDetails.languages || {}).join(', ')}
          </p>
          <p>
            <strong>Currencies:</strong>{' '}
            {Object.values(selectedCountryDetails.currencies || {})
              .map((currency) => `${currency.name} (${currency.symbol})`)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
