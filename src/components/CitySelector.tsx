import React from 'react';

interface Props {
  cities: string[];
  selectedCity: string;
  onChange: (city: string) => void;
}

const CitySelector: React.FC<Props> = ({ cities, selectedCity, onChange }) => {
  return (
    <select value={selectedCity} onChange={(e) => onChange(e.target.value)} disabled={!cities.length}>
      <option value="">Select a city</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;
