import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import rootReducer from './reducers/rootReducer'

export default function configureStore (preloadedState) {
  const middlewares = [thunkMiddleware, loggerMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  return createStore(rootReducer, preloadedState, middlewareEnhancer)
}
