// react
import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// app
import ENV from '../environment/index';

// lazy load components
const ImgurGallery = lazy(() => import('./screens/gallery/Imgur-Gallery'));
const Error404 = lazy(() => import('./screens/404/Error404'));

/**
 * Routing of the app
 * @returns {*}
 * @constructor
 */
const AppRouter = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.HOME} component={ImgurGallery} />
			<Route exact from="*" component={Error404} />
		</Switch>
	);
};
export default AppRouter;
