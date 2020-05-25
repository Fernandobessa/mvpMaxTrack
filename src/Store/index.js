import { createStore,applyMiddleware  } from 'redux'
import { combineReducers } from 'redux'
import history from "../Routes/history";
import moovie from '../Reducers/moovieReducer'
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk';

const middlewares = [routerMiddleware(history), thunk];

const rootReducer = combineReducers({
    router: connectRouter(history),
    moovie,
  })

const store  = createStore(connectRouter(history)(rootReducer),applyMiddleware(...middlewares))

export default store;  


