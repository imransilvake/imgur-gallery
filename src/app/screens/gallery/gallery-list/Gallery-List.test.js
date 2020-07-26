// react
import { render } from '@testing-library/react';
import React from 'react';

// redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../../slices';
import { galleryNextPage } from '../../../slices/gallery';

// store
const store = configureStore({
	reducer: rootReducer
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
