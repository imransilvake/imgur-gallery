// redux
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../../../slices';
import { galleryNextPage, galleryReset } from '../../../slices/gallery';
import { fetchApi, proxyReset } from '../../../slices/proxy';

// app
import { AppServices } from '../../../../app.config';
import { mockFailResponse, mockSuccessResponse } from '../../../utilities/test/api-mock-data';

// store
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware({
		serializableCheck: false, immutableCheck: false
	})]
});

test('[Paging] initial page number must be "0"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(0);
});

test('[Paging] on first call to "galleryNextPage()" the page number must be "1"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(0);
	store.dispatch(galleryNextPage());
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(1);
});

test('[Paging] on fifth call to "galleryNextPage()" the page number must be "5"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(1);
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(5);
});

test('[API] call "fetchApi()" and validate status code equal to 200', () => {
	// mock fetch api
	fetch.doMock();

	// mock response data (to avoid real api calls)
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));

	// reset gallery state
	store.dispatch(galleryReset());

	// fetch api and validate result
	return store.dispatch(
		fetchApi(
			AppServices.GALLERY.FETCH.URL,
			store.getState().gallery.galleryParams
		)
	).then(() => {
		expect(store.getState()['proxy']['response']['status']).toBe(200);
	});
});

test('[API] call "fetchApi()" and validate if it contains at-least one item', () => {
	// mock response data (to avoid real api calls)
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));

	// reset proxy state
	store.dispatch(proxyReset());

	// fetch api and validate result
	return store.dispatch(fetchApi(
		AppServices.GALLERY.FETCH.URL,
		store.getState().gallery.galleryParams
	)).then(() => {
		const { data } = store.getState()['proxy']['response'];
		expect(data && data[0]).not.toEqual({});
	});
});

test('[API] call "fetchApi()" multiple times and validate if old data persists', () => {
	// mock multiple responses (to avoid real api calls)
	fetch.mockResponses(
		[JSON.stringify(mockSuccessResponse()), {}],
		[JSON.stringify(mockSuccessResponse()), {}]
	);

	// payload
	const payload = store.getState().gallery.galleryParams;

	// reset proxy state
	store.dispatch(proxyReset());

	// fetch api and validate result
	return store.dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, payload)).then(() => {
		const { data } = store.getState()['proxy']['response'];
		return store.dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, payload)).then(() => {
			const data2 = store.getState()['proxy']['response']['data'];
			expect(data2.length).toBeGreaterThanOrEqual(data.length);
		});
	});
});

test('[API] handle "fetchApi()" exception with status code 400', () => {
	// mock implementation to reject api call
	fetch.mockReject(() => Promise.reject(mockFailResponse()));

	// fetch api and validate result
	return store.dispatch(fetchApi(
		AppServices.GALLERY.FETCH.URL,
		store.getState().gallery.galleryParams
	)).then(() => {
		expect(store.getState()['proxy']['errors']['status']).toBe(400);
	});
});
