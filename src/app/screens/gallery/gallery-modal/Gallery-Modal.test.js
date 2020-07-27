// react
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// redux
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../../../slices';
import { fetchApi } from '../../../slices/proxy/proxy';

// app
import { AppServices } from '../../../../app.config';
import GalleryList from '../gallery-list/Gallery-List';
import GalleryModal from './Gallery-Modal';

// mock IO
import '../../../../test/__mocks__/intersectionObserverMock';
import { mockSuccessResponse } from '../../../../test/api-mock-data';

// store
const store = configureStore({
	reducer: rootReducer,
	middleware: [...getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})]
});

/**
 * render component with redux
 * @param component
 * @returns {*}
 */
const renderWithRedux = (component) => {
	return <Provider store={store}>{component}</Provider>;
};

test('[Gallery Modal] validate if modal opens on fire event', () => {
	// mock fetch once
	fetch.doMockOnce();

	// mock response data (to avoid real api calls)
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));

	// fetch api to get some items
	return store.dispatch(
		fetchApi(
			AppServices.GALLERY.FETCH.URL,
			store.getState().gallery.galleryParams
		)
	).then(() => {
		const { getByTestId } = render(renderWithRedux(<GalleryList />));
		const { getByText } = render(renderWithRedux(<GalleryModal openModal={{
			cover: '',
			title: 'test'
		}} />));

		// fire event
		fireEvent.click(getByTestId('ig-item-button-0'));

		// expect
		expect(getByText('test')).toBeVisible();
	});
});
