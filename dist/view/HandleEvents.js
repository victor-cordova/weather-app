var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class HandleEvents {
    constructor(searcherCountry, searcherCity, wholeCountriesData, handleDom, countryService, app, citiesDatalist, countriesDatalist, onlyCities = []) {
        this.searcherCountry = searcherCountry;
        this.searcherCity = searcherCity;
        this.wholeCountriesData = wholeCountriesData;
        this.handleDom = handleDom;
        this.countryService = countryService;
        this.app = app;
        this.citiesDatalist = citiesDatalist;
        this.countriesDatalist = countriesDatalist;
        this.onlyCities = onlyCities;
        this.run = () => {
            this.searchCity();
            this.searchCountry();
            this.seeMoreOrLess();
        };
        this.searchCity = () => {
            var _a;
            (_a = this.searcherCity) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (event) => {
                var _a;
                const elementTarget = event.target;
                const childOptions = (_a = this.citiesDatalist) === null || _a === void 0 ? void 0 : _a.childNodes;
                if (childOptions && elementTarget) {
                    const input = elementTarget;
                    const arrayChildOptions = [...childOptions];
                    const options = arrayChildOptions;
                    options.find(option => {
                        if (option.value === input.value) {
                            search(option);
                        }
                    });
                }
            });
            const search = (option) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                const input = this.searcherCity;
                const isCity = (_b = this.onlyCities) === null || _b === void 0 ? void 0 : _b.includes(input.value);
                if (isCity) {
                    const { data, image } = yield this.countryService.getCity(input.value);
                    this.handleDom.weatherElement(data, image);
                    this.handleDom.deleteElement(option);
                }
            });
        };
        this.searchCountry = () => {
            var _a;
            (_a = this.searcherCountry) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (event) => {
                var _a;
                const elementTarget = event.target;
                const nodeListOptions = (_a = this.countriesDatalist) === null || _a === void 0 ? void 0 : _a.childNodes;
                if (nodeListOptions && elementTarget) {
                    const input = elementTarget;
                    const childOptions = [...nodeListOptions];
                    const options = childOptions;
                    const index = options.findIndex(option => input.value === option.value);
                    if (index !== -1 && index !== undefined) {
                        this.onlyCities = this.wholeCountriesData.data[index].cities;
                        this.handleDom.createCityOptionElements(this.onlyCities);
                    }
                }
            });
        };
        this.seeMoreOrLess = () => {
            var _a;
            (_a = this.app) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
                var _a;
                if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.nodeName) === "BUTTON") {
                    if (event.target.dataset.seeMore === "false") {
                        this.handleDom.handleClassNameWeatherElement(event.target.parentElement, event.target.dataset.seeMore, event.target);
                    }
                    else {
                        this.handleDom.handleClassNameWeatherElement(event.target.parentElement, event.target.dataset.seeMore, event.target);
                    }
                }
            });
        };
    }
}
