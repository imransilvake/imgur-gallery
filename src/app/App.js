// react
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// material
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

// app
import './App.scss';
import Logo from "../assets/svg/logo.svg";
import AppRouter from './AppRouter';

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
		<section className="ig-app-root">
			<MuiThemeProvider theme={theme}>
				<Suspense fallback={(<LinearProgress style={appStyles.linearProgress} />)}>
					<BrowserRouter>
						{/* Header */}
						<header className="ig-header">
							<img src={Logo} alt="app-logo" />
						</header>

						{/* Router */}
						<AppRouter />

						{/* Footer */}
					</BrowserRouter>
				</Suspense>
			</MuiThemeProvider>
		</section>
	);
};
export default App;
