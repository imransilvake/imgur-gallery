// react
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

// redux
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../../../slices';

// app
import GalleryFilters from './Gallery-Filters';
import { galleryFilters } from '../../../slices/gallery';

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

test('[Filter: Switch][name="viral"] validate text as "Show Viral"', () => {
	const { getByText } = render(renderWithRedux(<GalleryFilters />));
	expect(getByText('Show Viral')).toBeTruthy();
});

test('[Filter: Switch][name="viral"] default value should be checked', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId('ig-filter-form')).toHaveFormValues({
		viral: true
	});
});

test('[Filter: Switch][name="viral"] on click, switch should be unchecked', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	fireEvent.click(getByTestId('ig-switch'));
	expect(getByTestId('ig-filter-form')).toHaveFormValues({
		viral: false
	});
});

test('[Filter: Select][name="section"] default value should be "user"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId('ig-filter-form')).toHaveFormValues({
		section: 'user'
	});
});

test('[Filter: Select][name="sort"] default value should be "viral"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId('ig-filter-form')).toHaveFormValues({
		sort: 'viral'
	});
});

test('[Filter: Select][name="sort"] rising only available with user section', () => {
	// payload
	const filterState = {
		...store.getState()['gallery']['galleryParams']['keyValues'],
		section: 'user'
	};

	// dispatch
	store.dispatch(galleryFilters(filterState));

	// expect
	expect(store.getState()['gallery']['galleryParams']['keyValues']['sort'].disabled).not.toBeTruthy();
});

test('[Filter: Select][name="window"] default value should be "all"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId('ig-filter-form')).toHaveFormValues({
		window: 'all'
	});
});
