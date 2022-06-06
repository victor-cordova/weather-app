import { Country } from "./models/country.model";
import { GetCountries } from "./models/get-countries.model";

import { HandleDom } from "./view/HandleDom";
import { HandleEvents } from "./view/HandleEvents";
import { CountryService } from "./services/country.service";

const ICON_URL = "https://openweathermap.org/img/wn/";
const CITIES_URL = "https://api.openweathermap.org/data/2.5/weather?appid=291489f34be9e8c93fbdcac4970a9f25&units=metric&q=";
const COUNTRIES_URL = "https://countriesnow.space/api/v0.1/countries";

const temperatureIcon = "	https://img.icons8.com/android/48/undefined/temperature.png";
const humidityIcon = "https://img.icons8.com/glyph-neue/48/undefined/hygrometer.png";

const app: Element | null = document.querySelector("#app");

const form__countries: Element | null = document.querySelector("#form__countries");
const countriesDatalist: Element | null = document.querySelector("#countries");

const form__cities: Element | null = document.querySelector("#form__cities");
const citiesDatalist: Element | null = document.querySelector("#cities");

let onlyCountries: string[] = [];
let wholeCountriesData: Country;

const handleDom = new HandleDom(app, countriesDatalist, citiesDatalist, form__cities, {temperatureIcon, humidityIcon});
const countryService = new CountryService(COUNTRIES_URL, CITIES_URL, ICON_URL);

const run = async (): Promise<void> => {
  const countries: GetCountries = await countryService.getCountries();

  onlyCountries = countries.onlyCountries;
  wholeCountriesData = countries.wholeCountriesData;

  const handleEvents = new HandleEvents(form__countries, form__cities, wholeCountriesData, handleDom, countryService, app, citiesDatalist, countriesDatalist);

  handleDom.run(onlyCountries);
  handleEvents.run();
}

run();
