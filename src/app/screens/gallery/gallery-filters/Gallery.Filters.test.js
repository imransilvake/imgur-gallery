// react
import { render } from '@testing-library/react';
import React from 'react';

// redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../../slices';

// app
import GalleryFilters from './Gallery-Filters';

// store
const store = configureStore({
	reducer: rootReducer
});

test('[Filter: Switch][name="viral"] validate text as "Show Viral"', () => {
	const { getByText } = render(<Provider store={store}><GalleryFilters /></Provider>);
	expect(getByText('Show Viral')).toBeTruthy();
});

test('[Filter: Switch][name="viral"] default value should be checked', () => {
	const { getByTestId } = render(<Provider store={store}><GalleryFilters /></Provider>);
	expect(getByTestId('filter-form')).toHaveFormValues({
		viral: true
	});
});

test('[Filter: Select][name="section"] default value should be "user"', () => {
	const { getByTestId } = render(<Provider store={store}><GalleryFilters /></Provider>);
	expect(getByTestId('filter-form')).toHaveFormValues({
		section: 'user'
	});
});

test('[Filter: Select][name="sort"] default value should be "viral"', () => {
	const { getByTestId } = render(<Provider store={store}><GalleryFilters /></Provider>);
	expect(getByTestId('filter-form')).toHaveFormValues({
		sort: 'viral'
	});
});

test('[Filter: Select][name="window"] default value should be "all"', () => {
	const { getByTestId } = render(<Provider store={store}><GalleryFilters /></Provider>);
	expect(getByTestId('filter-form')).toHaveFormValues({
		window: 'all'
	});
});
