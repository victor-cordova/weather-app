import { Country } from "../models/country.model";
import { CountryService } from "../services/country.service";
import { HandleDom } from "./HandleDom";

export class HandleEvents {

  constructor (
    private searcherCountry: Element | null,
    private searcherCity: Element | null,
    private wholeCountriesData: Country,
    private handleDom: HandleDom,
    private countryService: CountryService,
    private app: Element | null,
    private citiesDatalist: Element | null,
    private countriesDatalist: Element | null,

    private onlyCities: string[] | undefined = [],
  ){}

  run = (): void => {
    this.searchCity();
    this.searchCountry();
    this.seeMoreOrLess();
  }

  private searchCity = (): void => {

    this.searcherCity?.addEventListener('input', (event: Event) => {
      const elementTarget: EventTarget | null = event.target;
      const childOptions: NodeListOf<ChildNode> | undefined = this.citiesDatalist?.childNodes;

      if (childOptions && elementTarget) {
        const input = elementTarget as HTMLInputElement;
        const arrayChildOptions = [...childOptions];
        const options = arrayChildOptions as HTMLOptionElement[];

        options.find(option => {
          if (option.value === input.value) {
            search(option);
          }
        })
      }
    });

    const search = async (option: HTMLOptionElement) => {
      const input = this.searcherCity as HTMLInputElement;
      const isCity = this.onlyCities?.includes(input.value);

      if (isCity) {
        const {data, image} = await this.countryService.getCity(input.value);

        this.handleDom.weatherElement(data, image);
        this.handleDom.deleteElement(option);
      }
    }
  }

  private searchCountry = (): void => {
    this.searcherCountry?.addEventListener('input', (event: Event) => {
      const elementTarget: EventTarget | null = event.target;
      const nodeListOptions: NodeListOf<ChildNode> | undefined = this.countriesDatalist?.childNodes;


      if (nodeListOptions && elementTarget) {
        const input = elementTarget as HTMLInputElement;
        const childOptions: any[] = [...nodeListOptions];
        const options = childOptions as HTMLOptionElement[];
        const index: number = options.findIndex(option => input.value === option.value);

        if (index !== -1 && index !== undefined) {
          this.onlyCities = this.wholeCountriesData.data[index].cities;

          this.handleDom.createCityOptionElements(this.onlyCities);
        }
      }
    });
  }

  private seeMoreOrLess = () => {
    this.app?.addEventListener("click", (event: any) => {
      if(event.target?.nodeName === "BUTTON") {
        if (event.target.dataset.seeMore === "false") {
          this.handleDom.handleClassNameWeatherElement(event.target.parentElement, event.target.dataset.seeMore, event.target);
        }
        else {
          this.handleDom.handleClassNameWeatherElement(event.target.parentElement, event.target.dataset.seeMore, event.target);
        }
      }
    })
  }
}
