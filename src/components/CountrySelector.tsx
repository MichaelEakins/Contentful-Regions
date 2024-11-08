import React from 'react';

interface Props {
  countries: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
}

const CountrySelector: React.FC<Props> = ({ countries, selectedCountry, onChange }) => {
  return (
    <select value={selectedCountry} onChange={(e) => onChange(e.target.value)} disabled={!countries.length}>
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
