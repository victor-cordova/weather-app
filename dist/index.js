var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HandleDom } from "./view/HandleDom.js";
import { HandleEvents } from "./view/HandleEvents.js";
import { CountryService } from "./services/country.service.js";
const ICON_URL = "https://openweathermap.org/img/wn/";
const CITIES_URL = "https://api.openweathermap.org/data/2.5/weather?appid=291489f34be9e8c93fbdcac4970a9f25&units=metric&q=";
const COUNTRIES_URL = "https://countriesnow.space/api/v0.1/countries";
const temperatureIcon = "	https://img.icons8.com/android/48/undefined/temperature.png";
const humidityIcon = "https://img.icons8.com/glyph-neue/48/undefined/hygrometer.png";
const app = document.querySelector("#app");
const form__countries = document.querySelector("#form__countries");
const countriesDatalist = document.querySelector("#countries");
const form__cities = document.querySelector("#form__cities");
const citiesDatalist = document.querySelector("#cities");
let onlyCountries = [];
let wholeCountriesData;
const handleDom = new HandleDom(app, countriesDatalist, citiesDatalist, form__cities, { temperatureIcon, humidityIcon });
const countryService = new CountryService(COUNTRIES_URL, CITIES_URL, ICON_URL);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const countries = yield countryService.getCountries();
    onlyCountries = countries.onlyCountries;
    wholeCountriesData = countries.wholeCountriesData;
    const handleEvents = new HandleEvents(form__countries, form__cities, wholeCountriesData, handleDom, countryService, app, citiesDatalist, countriesDatalist);
    handleDom.run(onlyCountries);
    handleEvents.run();
});
run();
