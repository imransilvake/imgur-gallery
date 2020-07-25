// initial state
import { createSlice } from '@reduxjs/toolkit';
import { original } from 'immer';

export const initialState = {
	galleryParams: {
		queryParams: {
			showViral: true,
			album_previews: true
		},
		pathValues: {
			section: 'hot',
			sort: 'viral',
			window: 'day',
			page: 0
		}
	}
};

// slice for data with reducers
const gallerySlice = createSlice({
	name: 'gallery',
	initialState,
	reducers: {
		galleryFilters: (state, { payload }) => {
			const gParams = original(state.galleryParams);
			state.galleryParams = {
				...gParams,
				queryParams: {
					...gParams.queryParams,
					showViral: payload.viral
				},
				pathValues: {
					...gParams.pathValues,
					section: payload.section,
					sort: payload.sort,
					window: payload.window
				}
			};
		},
		galleryNextPage: (state) => {
			const gParams = original(state.galleryParams);
			state.galleryParams = {
				...gParams,
				pathValues: {
					...gParams.pathValues,
					page: gParams.pathValues.page + 1
				}
			};
		},
		galleryReset: () => initialState
	}
});

// actions generated from the slice
export const { galleryNextPage, galleryFilters, galleryReset } = gallerySlice.actions;

// selector
export const gallerySelector = (state) => state['gallery'];

// reducer
export default gallerySlice.reducer;
