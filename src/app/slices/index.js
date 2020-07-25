// redux
import { combineReducers } from 'redux';

// app
import proxyReducer from './proxy';
import galleryReducer from './gallery';

const rootReducer = combineReducers({
	proxy: proxyReducer,
	gallery: galleryReducer
});

export default rootReducer;
