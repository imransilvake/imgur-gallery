// app
import { createSlice } from '@reduxjs/toolkit';

// initial state
export const initialState = {
	loading: false,
	hasErrors: false,
	data: []
};

// slice for data with reducers
const dataSlice = createSlice({
	name: 'proxy',
	initialState,
	reducers: {
		getData: (state) => {
			state.loading = true;
		},
		getDataSuccess: (state, { payload }) => {
			state.data = payload;
			state.loading = false;
			state.hasErrors = false;
		},
		getDataFailure: (state) => {
			state.loading = false;
			state.hasErrors = true;
		}
	}
});

// actions generated from the slice
export const { getData, getDataSuccess, getDataFailure } = dataSlice.actions;

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
		dispatch(getData());

		// query params
		let url = api;
		if (payload.queryParams) {
			url = `${api}${payload.queryParams}`;
		}

		try {
			const response = await fetch(url);
			const res = await response.json();

			// dispatch: data fetched
			dispatch(getDataSuccess(res));
		} catch (error) {
			// dispatch: fetch error
			dispatch(getDataFailure());
		}
	};
}
