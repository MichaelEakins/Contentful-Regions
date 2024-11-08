import React from 'react';

interface Props {
  continents: string[];
  selectedContinent: string;
  onChange: (continent: string) => void;
}

const ContinentSelector: React.FC<Props> = ({ continents, selectedContinent, onChange }) => {
  return (
    <select value={selectedContinent} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a continent</option>
      {continents.map((continent) => (
        <option key={continent} value={continent}>
          {continent}
        </option>
      ))}
    </select>
  );
};

export default ContinentSelector;
