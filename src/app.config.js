// app
import ENV from './environment';

// general
export const AppOptions = {
	API_KEY: 'e53f909dc7af6030d4830fe76a876f32',
	INTERVAL: {
		WEATHER: 60000
	}
};

// services
export const AppServices = {
	WEATHER: {
		GET_WEATHER: {
			URL: `${ENV().REST_API}/weather`
		}
	}
};
