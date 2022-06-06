import { Weather } from "./weather.model"

export interface GetCity {
  data: Weather,
  image: string,
}
