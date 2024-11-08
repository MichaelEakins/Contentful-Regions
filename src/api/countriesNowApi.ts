import axios from 'axios';

export interface Country {
  name: string;
  continent: string;
}

export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data.map((country: any) => ({
      name: country.name.common,
      continent: country.continents ? country.continents[0] : 'Unknown',
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchAllCities = async (): Promise<any[]> => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};
