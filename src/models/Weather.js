import { Record } from 'immutable'
export default class Weather extends Record({
  cityID: null,
  cityName: null,
  description: null,
  icon: null,
  temperature: null,
  feelsLike: null,
  pressure: null,
  humidity: null,
  windSpeed: null
}) {}
