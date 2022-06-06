export class HandleDom {
    constructor(app, countriesDatalist, citiesDatalist, cityInput, icons) {
        this.app = app;
        this.countriesDatalist = countriesDatalist;
        this.citiesDatalist = citiesDatalist;
        this.cityInput = cityInput;
        this.icons = icons;
        this.run = (countries) => {
            this.createCountryOptionElements(countries);
        };
        this.createCityOptionElements = (cities) => {
            var _a;
            const options = [];
            if (this.cityInput) {
                const input = this.cityInput;
                input.value = "";
            }
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
        this.deleteElement = (element) => {
            element.remove();
        };
        this.weatherElement = (data, iconImage) => {
            var _a;
            const element = this.createWeatherElement();
            this.addClassNameWeatherElement(element);
            this.addAtributesWeatherElement(element, data, iconImage);
            //Adding elements into app and container
            element.humidityConteiner.append(element.humidityIcon, element.humidity);
            element.temperatureConteiner.append(element.temperatureIcon, element.temperature);
            element.temperatureFLConteiner.append(element.temperatureFLIcon, element.temperatureFL);
            element.containerButton.append(element.button);
            element.moreInfo.append(element.humidityConteiner, element.temperatureFLConteiner);
            element.container.append(element.h2, element.img, element.description, element.temperatureConteiner, element.moreInfo, element.containerButton);
            (_a = this.app) === null || _a === void 0 ? void 0 : _a.append(element.container);
        };
        this.addAtributesWeatherElement = (element, data, iconImage) => {
            const image = element.img;
            const humidityIcon = element.humidityIcon;
            const temperatureIcon = element.temperatureIcon;
            const temperatureFLIcon = element.temperatureFLIcon;
            //Adding images
            image.src = iconImage;
            humidityIcon.src = this.icons.humidityIcon;
            temperatureIcon.src = this.icons.temperatureIcon;
            temperatureFLIcon.src = this.icons.temperatureIcon;
            element.button.dataset.seeMore = "false";
            //Adding texContent
            element.temperature.textContent = `${data.main.temp.toString()}°C`;
            element.temperatureFL.textContent = `Feels like: ${data.main.feels_like.toString()}°C`;
            element.humidity.textContent = `Humidity: ${data.main.humidity.toString()}%`;
            element.button.textContent = "See more";
            element.description.textContent = this.capitalizeFirstLetter(data.weather[0].description);
            element.h2.textContent = this.capitalizeFirstLetter(this.compressTitle(data.name));
        };
        this.compressTitle = (title) => {
            if (title.length > 11) {
                const words = title.split(" ");
                const word2 = words[1].slice(0, 1) + ".";
                return words[0] + " " + word2;
            }
            else {
                return title;
            }
        };
        this.addClassNameWeatherElement = (element) => {
            element.h2.className = "city__name";
            element.img.className = "city__img-weather";
            element.description.className = "city__description";
            element.temperatureConteiner.className = "city__data city__data--temperature";
            element.temperature.className = "city__data-text";
            element.temperatureIcon.className = "city__data-icon";
            element.temperatureFLConteiner.className = "city__data city__data--temperature-FL";
            element.temperatureFL.className = "city__data-text";
            element.temperatureFLIcon.className = "city__data-icon";
            element.humidityConteiner.className = "city__data city__data--humidity";
            element.humidity.className = "city__data-text";
            element.humidityIcon.className = "city__data-icon";
            element.moreInfo.className = "city__more-info";
            element.containerButton.className = "city__container-button";
            element.button.className = "city__button";
            element.container.className = "city";
        };
        this.handleClassNameWeatherElement = (element, datasetCondition, childElement) => {
            if (datasetCondition === "false") {
                childElement.dataset.seeMore = "true";
                childElement.textContent = "See less";
                element.parentElement.className += " city--expanded";
                setTimeout(() => {
                    element.previousElementSibling.className = "city__more-info city__more-info--on";
                }, 300);
            }
            else {
                childElement.dataset.seeMore = "false";
                childElement.textContent = "See more";
                element.previousElementSibling.className = "city__more-info";
                element.parentElement.classList.remove("city--expanded");
            }
        };
        this.capitalizeFirstLetter = (word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        };
        this.createCountryOptionElements = (countries) => {
            var _a;
            const options = [];
            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country;
                options.push(option);
            });
            (_a = this.countriesDatalist) === null || _a === void 0 ? void 0 : _a.append(...options);
        };
        this.createWeatherElement = () => {
            const container = document.createElement("div");
            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            const description = document.createElement("p");
            const temperatureFL = document.createElement("p");
            const temperatureFLConteiner = document.createElement("div");
            const temperatureFLIcon = document.createElement("img");
            const humidity = document.createElement("p");
            const humidityConteiner = document.createElement("div");
            const humidityIcon = document.createElement("img");
            const temperature = document.createElement("p");
            const temperatureConteiner = document.createElement("div");
            const temperatureIcon = document.createElement("img");
            const moreInfo = document.createElement("div");
            const containerButton = document.createElement("div");
            const button = document.createElement("button");
            return {
                container,
                h2,
                img,
                description,
                temperature,
                temperatureConteiner,
                temperatureIcon,
                temperatureFL,
                temperatureFLConteiner,
                temperatureFLIcon,
                humidity,
                humidityConteiner,
                humidityIcon,
                moreInfo,
                containerButton,
                button,
            };
        };
    }
}
