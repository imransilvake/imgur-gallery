// redux
import { createSlice } from '@reduxjs/toolkit';

// initial state
export const initialState = {
	loading: false,
	data: [],
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
			state.data = payload;
			state.errors = null;
		},
		dataFailure: (state, { payload }) => {
			state.loading = false;
			state.data = [];
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
export function fetchApi(api, payload) {
	return async (dispatch) => {
		// dispatch: start fetch process
		dispatch(dataLoading());

		// query params
		let url = api;
		if (payload.queryParams) {
			url = `${api}${payload.queryParams}`;
		}

		// api call
		try {
			const response = await fetch(url);
			const res = await response.json();

			// validate 200 status code
			if (res['cod'] !== 200) {
				throw res;
			}

			// dispatch: data
			dispatch(dataSuccess(res));
		} catch (error) {
			// dispatch: error
			dispatch(dataFailure(error));
		}
	};
}
