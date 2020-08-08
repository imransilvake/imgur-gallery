// app
import ENV from './environment';

// general
export const AppOptions = {
	IMGUR: {
		CLIENT_NAME: 'eurowings-challenge',
		CLIENT_ID: 'b6667866f8e791a'
	}
};

// services
export const AppServices = {
	GALLERY: {
		FETCH: {
			URL: `${ENV().REST_API}/gallery/{section}/{sort}/{window}/{page}`
		}
	}
};

// headers for a request to backend
export const RequestHeaders = {
	get: {
		authorization: `Client-ID ${AppOptions.IMGUR.CLIENT_ID}`
	},
	post: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};
