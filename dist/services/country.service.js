var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CountryService {
    constructor(countriesUrl, citiesUrl, iconsUrl) {
        this.countriesUrl = countriesUrl;
        this.citiesUrl = citiesUrl;
        this.iconsUrl = iconsUrl;
        this.getCity = (city) => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.citiesUrl}${city}`);
            if (response.status === 200) {
                const data = yield response.json();
                const image = this.getIcon(data.weather[0].icon);
                return {
                    data,
                    image,
                };
            }
            else {
                throw new Error(`There is an error. Status ${response.status}`);
            }
        });
        this.getCountries = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.countriesUrl);
            if (response.status === 200) {
                const wholeCountriesData = yield response.json();
                const onlyCountries = wholeCountriesData.data.map((iter) => iter.country);
                return {
                    onlyCountries,
                    wholeCountriesData
                };
            }
            else {
                throw new Error(`There is an error. Status ${response.status}`);
            }
        });
        this.getIcon = (icon) => {
            const image = `${this.iconsUrl}${icon}.png`;
            return image;
        };
    }
}
