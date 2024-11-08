const BASE_URL = 'https://countriesnow.space/api/v0.1';

export interface Country {
    name: string;
    continent: string;
  }
  
  export const fetchAllCountries = async (): Promise<Country[]> => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries');
    const data = await response.json();
  
    if (!data || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid data format received from API');
    }
  
    console.log('Fetched Countries:', data.data); // Debugging log
  
    return data.data.map((country: any) => ({
      name: country.country,
      continent: country.continent,
    }));
  };
  
  

export const fetchCitiesByCountry = async (country: string) => {
  const response = await fetch(`${BASE_URL}/countries/population/cities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country }),
  });
  const data = await response.json();
  return data.data.map((city: any) => ({
    name: city.city,
    population: city.populationCounts?.[0]?.value || 'Unknown',
    country,
  }));
};

export const fetchAllCities = async () => {
  const response = await fetch(`${BASE_URL}/countries/population/cities`);
  const data = await response.json();
  return data.data.map((city: any) => ({
    name: city.city,
    country: city.country,
    continent: city.continent,
    population: city.populationCounts?.[0]?.value || 'Unknown',
  }));
};
