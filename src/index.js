import React from 'react'
import ReactDOM from 'react-dom'
import { Grommet } from 'grommet'
import CityWeatherPage from './containers/CityWeatherContainer'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import configureStore from './configureStore'

const theme = {
  global: {
    font: {
      family: 'Cinzel',
      size: '18px',
      height: '20px'
    }
  }
}

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Grommet theme={theme}>
        <Switch>
          <Route path='/:city?'>
            <CityWeatherPage />
          </Route>
        </Switch>
      </Grommet>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
