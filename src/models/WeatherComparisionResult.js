import { Record } from 'immutable'

export default class WeatherComparisionResult extends Record({
  cityID: null,
  cityName: null,
  temperature: null,
  feelsLike: null,
  pressure: null,
  humidity: null,
  windSpeed: null
}) { }
