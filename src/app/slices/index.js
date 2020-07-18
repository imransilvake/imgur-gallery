// redux
import { combineReducers } from 'redux';

// app
import proxyReducer from './proxy';

const rootReducer = combineReducers({
	proxy: proxyReducer
});

export default rootReducer;
