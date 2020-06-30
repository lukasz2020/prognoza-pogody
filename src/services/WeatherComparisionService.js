import WeatherComparisionResult from '../models/WeatherComparisionResult'
import { List } from 'immutable'

export function compareWeather (weatherToCompare, locations = new List()) {
  return locations.map((weather) => {
    return new WeatherComparisionResult({
      cityID: weather.get('cityID'),
      cityName: weather.get('cityName'),
      temperature: compareParams(weather.get('temperature'), weatherToCompare.get('temperature')),
      feelsLike: compareParams(weather.get('feelsLike'), weatherToCompare.get('feelsLike')),
      pressure: compareParams(weather.get('pressure'), weatherToCompare.get('pressure')),
      humidity: compareParams(weather.get('humidity'), weatherToCompare.get('humidity')),
      windSpeed: compareParams(weather.get('windSpeed'), weatherToCompare.get('windSpeed'))
    })
  })
}

function compareParams (paramA, paramB) {
  return parseFloat((parseFloat(paramA.toFixed(1)) - parseFloat(paramB.toFixed(1))).toFixed(1))
}
