import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import styled from 'styled-components'
import { Box, Table, TableHeader, TableRow, TableCell, TableBody, ResponsiveContext, Text } from 'grommet'
import formatWeatherParam from '../helpers/WeatherParamsFormatter'
import { CELSIUS_SYMBOL, HUMIDITY_SYMBOL, PRESSURE_SYMBOL, WIND_SPEED_SYMBOL } from '../constants/constants'

const WeatherPositiveChange = styled.span`
  color: ${props => props.theme.global.colors['neutral-1']};
`

const WeatherNegativeChange = styled.span`
  color: ${props => props.theme.global.colors['neutral-4']};
`

Weather.propTypes = {
  weatherComparision: PropTypes.instanceOf(Map).isRequired
}

function Weather (props) {
  const { weatherComparision } = props

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const textSize = size === 'large' ? 'medium' : 'small'
        return (
          <Box direction='column' margin={{ top: 'auto' }} style={{ fontSize: size === 'large' ? '18px' : '14px' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope='col' border='bottom'>
                                        Nazwa miejscowości
                  </TableCell>
                  <TableCell scope='col' border='bottom'>
                                        Temperatura
                  </TableCell>
                  <TableCell scope='col' border='bottom'>
                                        Temperatura odczuwalna
                  </TableCell>
                  <TableCell scope='col' border='bottom'>
                                        Ciśnienie
                  </TableCell>
                  <TableCell scope='col' border='bottom'>
                                        Wilgotność
                  </TableCell>
                  <TableCell scope='col' border='bottom'>
                                        Siła wiatru
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  weatherComparision.valueSeq().map((comparision) => {
                    return (
                      <TableRow key={comparision.getIn(['weatherToCompare', 'cityID'])}>
                        <TableCell scope='row'>
                          <strong>{comparision.getIn(['weatherToCompare', 'cityName'])}</strong>
                        </TableCell>
                        <TableCell scope='row'>
                          <strong>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatWeatherParam(comparision.getIn(['weatherToCompare', 'temperature']), CELSIUS_SYMBOL)}</Text>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatComparisionResultParam(comparision.getIn(['result', 'temperature']), CELSIUS_SYMBOL)}</Text>
                          </strong>
                        </TableCell>
                        <TableCell scope='row'>
                          <strong>
                            <strong>
                              <Text size={textSize} margin={{ right: 'xsmall' }}>{formatWeatherParam(comparision.getIn(['weatherToCompare', 'feelsLike']), CELSIUS_SYMBOL)}</Text>
                              <Text size={textSize} margin={{ right: 'xsmall' }}>{formatComparisionResultParam(comparision.getIn(['result', 'feelsLike']), CELSIUS_SYMBOL)}</Text>
                            </strong>
                          </strong>
                        </TableCell>
                        <TableCell scope='row'>
                          <strong>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatWeatherParam(comparision.getIn(['weatherToCompare', 'pressure']), PRESSURE_SYMBOL)}</Text>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatComparisionResultParam(comparision.getIn(['result', 'pressure']), PRESSURE_SYMBOL)}</Text>
                          </strong>
                        </TableCell>
                        <TableCell scope='row'>
                          <strong>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatWeatherParam(comparision.getIn(['weatherToCompare', 'humidity']), HUMIDITY_SYMBOL)}</Text>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatComparisionResultParam(comparision.getIn(['result', 'humidity']), HUMIDITY_SYMBOL)}</Text>
                          </strong>
                        </TableCell>
                        <TableCell scope='row'>
                          <strong>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatWeatherParam(comparision.getIn(['weatherToCompare', 'windSpeed']), WIND_SPEED_SYMBOL)}</Text>
                            <Text size={textSize} margin={{ right: 'xsmall' }}>{formatComparisionResultParam(comparision.getIn(['result', 'windSpeed']), WIND_SPEED_SYMBOL)}</Text>
                          </strong>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Box>)
      }}
    </ResponsiveContext.Consumer>

  )
}

export default Weather

function formatComparisionResultParam (value, symbol = '') {
  if (value === 0) {
    return '(B/Z)'
  }
  value = value.toFixed(1)

  return parseFloat(value) > 0 ? <WeatherPositiveChange>{`(+ ${value} ${symbol})`}</WeatherPositiveChange> : <WeatherNegativeChange>{`(${value} ${symbol})`}</WeatherNegativeChange>
}
