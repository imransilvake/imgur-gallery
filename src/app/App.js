// react
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

// theme setting
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#38805b',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#e01840',
			contrastText: '#ffffff'
		},
		error: {
			main: '#e74c3c'
		}
	}
});

// app styles
const appStyles = {
	linearProgress: {
		backgroundColor: 'var(--c1)'
	}
};

/**
 * app container
 * @returns {*}
 * @constructor
 */
const App = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Suspense fallback={(<LinearProgress style={appStyles.linearProgress} />)}>
				<BrowserRouter>
					{/* Header */}

					<AppRouter />

					{/* Footer */}
				</BrowserRouter>
			</Suspense>
		</MuiThemeProvider>
	);
};
export default App;
