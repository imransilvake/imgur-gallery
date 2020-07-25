// redux
import { createSlice } from '@reduxjs/toolkit';
import { original } from 'immer';

// app
import {
	addMatrixParamsToUrl, addPathParams,
	addPathValues, addQueryParamsToUrl, getHeaders
} from '../utilities/core/proxy-options';

// initial state
export const initialState = {
	loading: false,
	response: {},
	errors: null
};

// slice for data with reducers
const proxySlice = createSlice({
	name: 'proxy',
	initialState,
	reducers: {
		proxyLoading: (state) => {
			state.loading = true;
		},
		proxySuccess: (state, { payload }) => {
			const oldState = original(state.response);
			const newData = (oldState && oldState.data) ? [...oldState.data, ...payload.data] : payload.data;
			state.loading = false;
			state.response = { ...payload, data: newData };
			state.errors = null;
		},
		proxyFailure: (state, { error }) => {
			state.loading = false;
			state.response = {};
			state.errors = error;
		},
		proxyReset: () => initialState
	}
});

// actions generated from the slice
export const {
	proxyLoading, proxySuccess, proxyFailure, proxyReset
} = proxySlice.actions;

// selector
export const proxySelector = (state) => state['proxy'];

// reducer
export default proxySlice.reducer;

/**
 * asynchronous fetch api
 * @param api
 * @param payload
 * @returns {function(...[*]=)}
 */
export const fetchApi = (api, payload) => {
	return async (dispatch) => {
		// dispatch: start fetch process
		dispatch(proxyLoading());

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
			dispatch(proxySuccess(res));
		} catch (error) {
			// dispatch: error
			dispatch(proxyFailure(error));
		}
	};
};
