import { Country } from "./country.model";

export interface GetCountries {
  onlyCountries: string[],
  wholeCountriesData: Country,
}
