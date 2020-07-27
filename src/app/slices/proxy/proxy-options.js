// app
import { RequestHeaders } from '../../../app.config';

/**
 * add headers for the api
 * @param postApi
 * @returns {*}
 */
const addHeaders = (postApi) => {
	// request headers defined in app config file
	const headerValues = (postApi) ? RequestHeaders.post : RequestHeaders.get;

	// set headers
	const headers = {};
	if (Object.keys(headerValues).length !== 0) {
		Object.keys(headerValues).forEach((key) => {
			headers[key] = headerValues[key];
		});
	}

	// return
	return {
		headers
	};
};

/**
 * adds query parameter(s) to the given url
 * example: http://www.example.com/example-page?field1=value1&field2=value2&field3=value3
 * @param url
 * @param queryParams
 * @returns {string}
 */
const addQueryParamsToUrl = (url, queryParams) => {
	let params = '';
	let firstItem = true;

	if (queryParams !== null && Object.keys(queryParams).length !== 0) {
		Object.keys(queryParams).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				// set ? at start and & for the rest
				if (firstItem) {
					params = '?';
					firstItem = false;
				} else {
					params += '&';
				}

				// logic
				if (queryParams[key] instanceof Array) {
					let nestedFirstItem = false;
					queryParams[key].forEach((value) => {
						if (nestedFirstItem) {
							params = '?';
							nestedFirstItem = false;
						} else {
							params += '&';
						}

						// concatenate
						params = params.concat(key)
							.concat('=')
							.concat(value);
					});
				} else {
					// concatenate
					params = params.concat(key)
						.concat('=')
						.concat(queryParams[key]);
				}
			}
		});
	}
	return url + params;
};

/**
 * adds matrix parameter(s) to the given url
 * example: http://www.example.com/example-page;field1=value1;field2=value2;field3=value3
 * @param url
 * @param matrixParams
 * @returns {string}
 */
const addMatrixParamsToUrl = (url, matrixParams) => {
	let newUrl = url;
	if (matrixParams) {
		Object.keys(matrixParams).forEach((key) => {
			newUrl = newUrl.concat(';').concat(key).concat('=').concat(matrixParams[key]);
		});
	}
	return newUrl;
};

/**
 * adds path params to the given url
 * example: /customer/profile/reservation/:reservationId
 * example: {reservationId} is a required path parameter
 * @param url
 * @param pathParams
 * @returns {*}
 */
const addPathParams = (url, pathParams) => {
	let newUrl = url;
	if (pathParams) {
		Object.keys(pathParams).forEach((param) => {
			if (Object.prototype.hasOwnProperty.call(pathParams, param)) {
				newUrl = newUrl.replace(`:${param}`, pathParams[param]);
			}
		});
	}
	return newUrl;
};

/**
 * adds key values
 * example: /{section}/{sort}/{window}/{page}
 * @param url
 * @param keyValues
 * @returns {*}
 */
const addKeyValues = (url, keyValues) => {
	let newUrl = url;
	if (keyValues) {
		Object.keys(keyValues).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(keyValues, key)) {
				const value = typeof keyValues[key] === 'object' ? keyValues[key]['value'] : keyValues[key];
				newUrl = newUrl.replace(`{${key}}`, value);
			}
		});
	}
	return newUrl;
};

export {
	addHeaders,
	addQueryParamsToUrl,
	addMatrixParamsToUrl,
	addPathParams,
	addKeyValues
};
