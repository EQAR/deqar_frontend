import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

// Initialize middlewares with redux-devtools-extension
const middleWare = composeWithDevTools(applyMiddleware(thunk));

// Create the Redux store
const store = createStore(reducer, middleWare,);

export default store;
