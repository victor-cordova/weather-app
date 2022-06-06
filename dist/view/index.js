export class HandleDom {
    constructor(app, countriesDatalist, citiesDatalist) {
        this.app = app;
        this.countriesDatalist = countriesDatalist;
        this.citiesDatalist = citiesDatalist;
        // run = (
        //   // loadCat: LoadCatImage
        //   ) => {
        //   // this.loadCat = loadCat;
        // }
        this.createOptionCountryElements = async (countries) => {
            var _a;
            const options = [];
            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country;
                options.push(option);
            });
            (_a = this.countriesDatalist) === null || _a === void 0 ? void 0 : _a.append(...options);
        };
        this.createCityOptionElements = (cities) => {
            var _a;
            const options = [];
            if (this.citiesDatalist) {
                this.citiesDatalist.innerHTML = "";
            }
            cities.forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                options.push(option);
            });
            (_a = this.citiesDatalist) === null || _a === void 0 ? void 0 : _a.append(...options);
        };
        this.capitalizeFirstLetter = (word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };
        this.createWeatherElement = () => {
            const container = document.createElement("div");
            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            const description = document.createElement("p");
            const temperature = document.createElement("p");
            const temperatureFeelsLike = document.createElement("p");
            const humidity = document.createElement("p");
            return {
                container,
                h2,
                img,
                description,
                temperature,
                temperatureFeelsLike,
                humidity,
            };
        };
        this.addClassNameWeatherElement = (element, isDay) => {
            element.h2.className = "city__name";
            element.img.className = "city__img-weather";
            element.description.className = "city__description";
            element.temperature.className = "city__temperature";
            element.temperatureFeelsLike.className = "city__temperature-feels-like";
            element.humidity.className = "city__humidity";
            if (isDay) {
                element.container.className = "city city--day";
            }
            else {
                element.container.className = "city city--night";
            }
        };
        this.addAtributesWeatherElement = (element, data, iconImage) => {
            const image = element.img;
            image.src = iconImage;
            element.description.textContent = this.capitalizeFirstLetter(data.weather[0].description);
            element.h2.textContent = data.name;
            element.temperature.textContent = `${data.main.temp.toString()}°C`;
            element.temperatureFeelsLike.textContent = `Temperature feels like:\n ${data.main.feels_like.toString()}°C`;
            element.humidity.textContent = `Humidity: ${data.main.humidity.toString()}%`;
        };
        this.weatherElement = (data, iconImage) => {
            var _a;
            const element = this.createWeatherElement();
            this.addClassNameWeatherElement(element, data.weather[0].icon[2] === "d");
            this.addAtributesWeatherElement(element, data, iconImage);
            //Adding elements into app and container
            element.container.append(element.h2, element.img, element.description, element.temperature, element.humidity, element.temperatureFeelsLike);
            (_a = this.app) === null || _a === void 0 ? void 0 : _a.append(element.container);
        };
    }
}
