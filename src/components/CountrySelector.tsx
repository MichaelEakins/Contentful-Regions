import React from 'react';

interface CountrySelectorProps {
  countries: string[];
  selectedCountry: string;
  onChange: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  countries,
  selectedCountry,
  onChange,
}) => {
  return (
    <select
      value={selectedCountry}
      onChange={(e) => onChange(e.target.value)}
      disabled={countries.length === 0}
    >
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
