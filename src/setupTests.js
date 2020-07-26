// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// mock api response to avoid calling real api for tests.
// Making HTTP requests in tests isn't a great idea in most situations.
// It can slow your tests down, is unreliable, and the API you are making requests to may not appreciate it either.

// adds the 'fetchMock' global variable
import fetchMock from 'jest-fetch-mock';

// rewires 'fetch' global to call 'fetchMock' instead of the real implementation
// changes default behavior of fetchMock to use the real 'fetch' implementation and not mock responses
fetchMock.enableMocks();
fetchMock.dontMock();
