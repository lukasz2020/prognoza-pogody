import {
  LOAD_WEATHER_DATA_REQUEST,
  LOAD_WEATHER_DATA_SUCCESS,
  LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_SUCCESS,
  LOAD_WEATHER_DATA_FAILURE
} from '../actions/weatherActionTypes'
import { Map } from 'immutable'
import { compareWeather } from '../services/WeatherComparisionService'

const initialState = new Map({
  weather: null,
  weatherComparision: new Map(),
  hasError: false
})

export default function weather (state = initialState, action) {
  switch (action.type) {
    case LOAD_WEATHER_DATA_REQUEST:
      return state
    case LOAD_WEATHER_DATA_SUCCESS:
      return state.set('weather', action.weather).set('hasError', false)
    case LOAD_WEATHER_DATA_FAILURE:
      return state.set('hasError', true)
    case LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_SUCCESS: {
      let weatherComparision = new Map()

      action.weather.forEach((weather) => {
        weatherComparision = weatherComparision.setIn([weather.get('cityID'), 'weatherToCompare'], weather)
      })

      compareWeather(state.get('weather'), action.weather).forEach((result) => {
        console.log(result)
        weatherComparision = weatherComparision.setIn([result.get('cityID'), 'result'], result)
      })

      return state.set('weatherComparision', weatherComparision)
    }
    default:
      return state
  }
}
