import React from 'react'
import PropTypes from 'prop-types'
import WeatherModel from '../models/Weather'
import styled from 'styled-components'
import formatWeatherParam from '../helpers/WeatherParamsFormatter'
import { CELSIUS_SYMBOL, HUMIDITY_SYMBOL, PRESSURE_SYMBOL, WIND_SPEED_SYMBOL } from '../constants/constants'
import { Box, Heading, Paragraph, Image, Text, List } from 'grommet'

const WeatherImage = styled(Image)`
  flex: 0 0 auto;
`

Weather.propTypes = {
  weather: PropTypes.instanceOf(WeatherModel)
}

function Weather (props) {
  const { weather } = props

  return (
    <Box direction='column' margin={{ right: 'medium' }} justify='center' alignSelf='start'>
      <Box>
        <Heading textAlign='center' margin='none'>{weather.get('cityName')}</Heading>
        <Box direction='row' justify='center'>
          <WeatherImage src={`https://openweathermap.org/img/wn/${weather.get('icon')}@2x.png`} fit='contain' />
          <Text alignSelf='center' size='xxlarge'>{weather.get('temperature').toFixed(1)} ℃</Text>
        </Box>
        <Paragraph textAlign='center'>{weather.get('description')}</Paragraph>
      </Box>
      <List
        primaryKey='name'
        secondaryKey='value'
        data={[
          { name: 'Temperatura odczuwalna', value: formatWeatherParam(weather.get('temperature'), CELSIUS_SYMBOL) },
          { name: 'Ciśnienie', value: formatWeatherParam(weather.get('pressure'), PRESSURE_SYMBOL) },
          { name: 'Wilgotność', value: formatWeatherParam(weather.get('humidity'), HUMIDITY_SYMBOL) },
          { name: 'Siła wiatru', value: formatWeatherParam(weather.get('windSpeed'), WIND_SPEED_SYMBOL) }
        ]}
      />
    </Box>
  )
}

export default Weather
