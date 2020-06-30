import {
  LOAD_WEATHER_DATA_FAILURE,
  LOAD_WEATHER_DATA_REQUEST,
  LOAD_WEATHER_DATA_SUCCESS,
  LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_REQUEST,
  LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_SUCCESS,
  LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_FAILURE
} from './weatherActionTypes'
import { MOST_POPULAR_CITIES } from '../constants/constants'
import Weather from '../models/Weather'
import fetch from 'cross-fetch'
import { List } from 'immutable'

export function loadWeatherData (cityName) {
  return function (dispatch) {
    dispatch({
      type: LOAD_WEATHER_DATA_REQUEST
    })

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pl&units=metric&appid=817459b6a4fa2fee0fbb561b73d3e4aa`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => {
        return dispatch({
          type: LOAD_WEATHER_DATA_SUCCESS,
          weather: new Weather({
            cityID: data.id,
            cityName: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
          })
        })
      })
      .catch(() => {
        return dispatch({
          type: LOAD_WEATHER_DATA_FAILURE
        })
      })
  }
}

export function loadMostPopularCitiesWeatherData (cityID) {
  return function (dispatch) {
    dispatch({
      type: LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_REQUEST
    })

    const cities = [...MOST_POPULAR_CITIES]
    const cityIndex = MOST_POPULAR_CITIES.findIndex((id) => {
      return id === cityID
    })

    if (cityIndex !== -1) {
      cities.splice(cityIndex, 1)
    }

    fetch(`https://api.openweathermap.org/data/2.5/group?id=${cities.join(',')}&units=metric&lang=pl&appid=817459b6a4fa2fee0fbb561b73d3e4aa`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong')
        }
      })
      .then(data => {
        return dispatch({
          type: LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_SUCCESS,
          weather: new List(data.list.map((data) => {
            return new Weather({
              cityID: data.id,
              cityName: data.name,
              description: data.weather.description,
              icon: data.weather.icon,
              temperature: data.main.temp,
              feelsLike: data.main.feels_like,
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed
            })
          }))
        })
      })
      .catch(() => {
        return dispatch({
          type: LOAD_MOST_POPULAR_CITIES_WEATHER_DATA_FAILURE
        })
      })
  }
}
