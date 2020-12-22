import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from "redux-thunk";
import CountersApp from '../reducers/index';

export default createStore(CountersApp, applyMiddleware(thunkMiddleware));