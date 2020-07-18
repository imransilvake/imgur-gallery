// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './app/slices';

// app
import './styles.scss';
import './assets/i18n/i18n';
import App from './app/App';

const store = configureStore({
	reducer: rootReducer
});

ReactDOM.render(
	<>
		<Provider store={store}>
			<App />
		</Provider>
	</>,
	document.getElementById('root')
);
