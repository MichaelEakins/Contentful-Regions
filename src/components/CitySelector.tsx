interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities = [], selectedCity, onChange }) => {
  return (
    <select
      value={selectedCity}
      onChange={(e) => onChange(e.target.value)}
      disabled={cities.length === 0}
    >
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
