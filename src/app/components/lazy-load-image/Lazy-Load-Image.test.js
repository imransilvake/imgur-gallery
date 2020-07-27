// react
import React from 'react';
import { render } from '@testing-library/react';

// app
import LazyLoadImage from './Lazy-Load-Image';

// mock IO
import '../../../test/__mocks__/intersectionObserverMock';

test('[Lazy-Load-Image] image is not loaded at start', () => {
	const { getByTestId } = render(<LazyLoadImage />);
	expect(getByTestId('ig-placeholder')).toBeInTheDocument();
});
