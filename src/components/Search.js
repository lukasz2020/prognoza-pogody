import React from 'react'
import {
  Box,
  TextInput,
  Button,
  ResponsiveContext,
  Text
} from 'grommet'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

Search.propTypes = {
  hasError: PropTypes.bool.isRequired
}

function Search (props) {
  const { hasError } = props
  const [value, setValue] = React.useState('')
  const history = useHistory()

  const onSearchClick = () => {
    history.push({
      pathname: value
    })
  }

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Box direction='column' size='large' pad='medium' justify='center' align='center' height={size === 'large' ? 'small' : 'auto'} flex='grow'>
            <Box direction='row' width='large' margin={{ bottom: hasError ? '0' : 'large' }}>
              <Box width='large'>
                <TextInput
                  placeholder='Wpisz nazwę miejscowości'
                  value={value}
                  onChange={event => setValue(event.target.value)}
                />
              </Box>
              <Button
                onClick={onSearchClick} primary size={size !== 'small' ? 'large' : 'medium'} label='Szukaj' margin={{
                  left: 'small'
                }}
              />
            </Box>
            {hasError &&
              <Box width='large' height='xxsmall' pad='small'>
                <Text color='status-critical'>Miejscowość nie została znaleziona - proszę spróbować ponownie</Text>
              </Box>}
          </Box>
        </>)}
    </ResponsiveContext.Consumer>
  )
}

export default Search
