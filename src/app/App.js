// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// app
import AppRouter from './AppRouter';

const App = () => {
	return (
		<React.Suspense fallback={<div>...Loading</div>}>
			<BrowserRouter>
				{/* Header */}

				<AppRouter />

				{/* Footer */}
			</BrowserRouter>
		</React.Suspense>
	);
};
export default App;
