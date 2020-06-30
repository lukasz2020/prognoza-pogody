import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import Weather from '../components/Weather'
import WeatherModel from '../models/Weather'
import WeatherComparision from '../components/WeatherComparision'
import Search from '../components/Search'
import { Map } from 'immutable'
import { Box, ResponsiveContext } from 'grommet'

CityWeather.propTypes = {
  onInitialize: PropTypes.func.isRequired,
  onWeatherComparisionInitialize: PropTypes.func.isRequired,
  weather: PropTypes.instanceOf(WeatherModel),
  weatherComparision: PropTypes.instanceOf(Map),
  hasError: PropTypes.bool.isRequired
}

function CityWeather (props) {
  const { onInitialize, onWeatherComparisionInitialize, weather, weatherComparision, hasError } = props
  const { city } = useParams()

  useEffect(() => {
    if (city) {
      onInitialize(city)
    }
  }, [city, onInitialize])

  const cityID = weather === null ? null : weather.get('cityID')

  useEffect(() => {
    if (cityID) {
      onWeatherComparisionInitialize(cityID)
    }
  }, [cityID, onWeatherComparisionInitialize])

  const isWeatherCoparisionAvailable = !!weatherComparision.count()

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box fill direction={size !== 'large' ? 'column' : 'row'} justify='center'>
          {weather &&
            <Box direction='row' justify='center' basis={size !== 'small' ? '500px' : 'auto'}>
              <Weather weather={weather} />
            </Box>}
          <Box flex direction={isWeatherCoparisionAvailable ? 'column' : 'row'}>
            <Search hasError={hasError} />
            {isWeatherCoparisionAvailable && <WeatherComparision weatherComparision={weatherComparision} />}
          </Box>
        </Box>)}
    </ResponsiveContext.Consumer>
  )
}

export default CityWeather
