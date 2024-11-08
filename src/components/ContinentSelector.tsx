import React from 'react';

interface ContinentSelectorProps {
  continents: string[];
  selectedContinent: string;
  onChange: (continent: string) => void;
}

const ContinentSelector: React.FC<ContinentSelectorProps> = ({
  continents,
  selectedContinent,
  onChange,
}) => {
  return (
    <select
      value={selectedContinent}
      onChange={(e) => onChange(e.target.value)}
      disabled={continents.length === 0}
    >
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
