import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import appReducer from './reducers/app';
import productReducer from './reducers/product';

const reducer = combineReducers({
  appReducer,
  productReducer,
});

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)
  : compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...[thunk])
  )
);

export default store;

