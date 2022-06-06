import { Country } from "../models/country.model";
import { Weather } from "../models/weather.model";
import { GetCountries } from "../models/get-countries.model"
import { GetCity } from "../models/get-city.model"

export class CountryService {
  constructor (
    private countriesUrl: string,
    private citiesUrl: string,
    private iconsUrl: string,
  ){}

  getCity = async (city: string): Promise<GetCity> => {
    const response: Response = await fetch(`${this.citiesUrl}${city}`);

    if (response.status === 200) {
      const data: Weather = await response.json();
      const image: string = this.getIcon(data.weather[0].icon);

      return {
        data,
        image,
      }
    }
    else {
      throw new Error(`There is an error. Status ${response.status}`);
    }
  }

  getCountries = async (): Promise<GetCountries> => {
    const response: Response = await fetch(this.countriesUrl);

    if(response.status === 200) {
      const wholeCountriesData: Country = await response.json();
      const onlyCountries: string[] = wholeCountriesData.data.map((iter: any) => iter.country);

      return {
        onlyCountries,
        wholeCountriesData
      };
    } else {
      throw new Error(`There is an error. Status ${response.status}`)
    }
  }

  getIcon = (icon: string): string => {
    const image: string = `${this.iconsUrl}${icon}.png`;

    return image;
  }
}
