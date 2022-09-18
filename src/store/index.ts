// TODO 使用 @reduxjs/toolkit configureStore 替换
import { createStore } from 'redux';
import Immutable from 'immutable';
import reducer from './reducer';

const initialState: any = Immutable.Map();

// redux extension
const targetWindow: any = window;
const __REDUX_EXTENSION__ = targetWindow.__REDUX_DEVTOOLS_EXTENSION__;

// create store instance
const store: any = createStore(reducer, initialState, __REDUX_EXTENSION__ && __REDUX_EXTENSION__());

export default store;
