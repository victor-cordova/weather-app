import { Weather } from "../models/weather.model";
import { WeatherElement } from "../models/weather-element.model";

interface Icons {
  temperatureIcon: string,
  humidityIcon: string,
}

export class HandleDom {

  constructor(
    private app: Element | null,
    private countriesDatalist: Element | null,
    private citiesDatalist: Element | null,
    private cityInput: Element | null,
    private icons: Icons,
  ){}

  run = (countries: string[]): void => {
    this.createCountryOptionElements(countries);
  }

  createCityOptionElements = (cities: string[]): void => {
    const options: HTMLOptionElement[] = [];
    if (this.cityInput) {
      const input = this.cityInput as HTMLInputElement;

      input.value = "";
    }


    if (this.citiesDatalist) {
      this.citiesDatalist.innerHTML = "";
    }

    cities.forEach(city => {
      const option = document.createElement("option");

      option.value = city;
      options.push(option);
    })
    this.citiesDatalist?.append(...options);
  }

  deleteElement = (element: HTMLElement) => {
    element.remove();
  }

  weatherElement = (data: Weather, iconImage: string): void => {
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
    this.app?.append(element.container);
  }


  private addAtributesWeatherElement = (element: WeatherElement, data: Weather, iconImage: string): void => {
    const image = element.img as HTMLImageElement;
    const humidityIcon = element.humidityIcon as HTMLImageElement;
    const temperatureIcon = element.temperatureIcon as HTMLImageElement;
    const temperatureFLIcon = element.temperatureFLIcon as HTMLImageElement;

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
  }

  private compressTitle = (title: string): string => {

    if (title.length > 11) {
      const words: string[] = title.split(" ");
      const word2: string = words[1].slice(0, 1) + ".";
      return words[0] + " " + word2;
    } else {
      return title;
    }

  }

  private addClassNameWeatherElement = (element: WeatherElement): void => {
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
  }

  handleClassNameWeatherElement = (element: any, datasetCondition: string, childElement: any) => {
    if (datasetCondition === "false") {
      childElement.dataset.seeMore = "true";
      childElement.textContent = "See less";
      element.parentElement.className += " city--expanded"
      setTimeout(() => {
        element.previousElementSibling.className = "city__more-info city__more-info--on"
      }, 300);
    }
    else {
      childElement.dataset.seeMore = "false";
      childElement.textContent = "See more";
      element.previousElementSibling.className = "city__more-info";
      element.parentElement.classList.remove("city--expanded");
    }
  }

  private capitalizeFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  private createCountryOptionElements = (countries: string[]): void => {
    const options: HTMLOptionElement[] = [];
    countries.forEach(country => {
      const option = document.createElement("option");

      option.value = country;
      options.push(option);
    })
    this.countriesDatalist?.append(...options);
  }

  private createWeatherElement = (): WeatherElement => {

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
  }
}
