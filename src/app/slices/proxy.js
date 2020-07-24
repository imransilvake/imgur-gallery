// redux
import { createSlice } from '@reduxjs/toolkit';

// app
import {
	addMatrixParamsToUrl, addPathParams,
	addPathValues, addQueryParamsToUrl, getHeaders
} from '../utilities/core/proxy-options';

// initial state
export const initialState = {
	loading: false,
	response: [],
	errors: null
};

// slice for data with reducers
const dataSlice = createSlice({
	name: 'proxy',
	initialState,
	reducers: {
		dataLoading: (state) => {
			state.loading = true;
		},
		dataSuccess: (state, { payload }) => {
			state.loading = false;
			state.response = payload;
			state.errors = null;
		},
		dataFailure: (state, { payload }) => {
			state.loading = false;
			state.response = [];
			state.errors = payload;
		}
	}
});

// actions generated from the slice
export const { dataLoading, dataSuccess, dataFailure } = dataSlice.actions;

// selector
export const dataSelector = (state) => state.proxy;

// reducer
export default dataSlice.reducer;

/**
 * asynchronous fetch api
 * @param api
 * @param payload
 * @returns {function(...[*]=)}
 */
export const fetchApi = (api, payload) => {
	return async (dispatch) => {
		// dispatch: start fetch process
		dispatch(dataLoading());

		// query params
		let url = api;
		if (payload['queryParams']) {
			url = `${addQueryParamsToUrl(api, payload['queryParams'])}`;
		}

		// path params
		if (payload['pathParams']) {
			url = `${addPathParams(url, payload['pathParams'])}`;
		}

		// path values
		if (payload['pathValues']) {
			url = `${addPathValues(url, payload['pathValues'])}`;
		}

		// matrix params
		if (payload['matrixParams']) {
			url = `${addMatrixParamsToUrl(url, payload['matrixParams'])}`;
		}

		// api call
		try {
			const response = await fetch(url, getHeaders());
			const res = await response.json();

			// validate 200 status code
			if (res['status'] !== 200) {
				throw res;
			}

			// dispatch: response
			dispatch(dataSuccess(res));
		} catch (error) {
			// dispatch: error
			dispatch(dataFailure(error));
		}
	};
};
