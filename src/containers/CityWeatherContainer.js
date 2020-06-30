import { connect } from 'react-redux'
import { loadWeatherData, loadMostPopularCitiesWeatherData } from '../actions/weatherActionCreators'
import CityWeather from '../pages/CityWeather'

const mapStateToProps = (state) => {
  const { weatherReducer } = state

  return {
    weather: weatherReducer.get('weather'),
    weatherComparision: weatherReducer.get('weatherComparision'),
    hasError: weatherReducer.get('hasError')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitialize: (city) => {
      dispatch(loadWeatherData(city))
    },
    onWeatherComparisionInitialize: (cityID) => {
      dispatch(loadMostPopularCitiesWeatherData(cityID))
    }
  }
}

const CityWeatherPage = connect(mapStateToProps, mapDispatchToProps)(CityWeather)

export default CityWeatherPage
