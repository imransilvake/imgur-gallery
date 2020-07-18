/**
 * add letter spacing
 * @param str
 * @param spaces
 * @returns {string}
 */
const addLetterSpacing = (str, spaces) => {
	const fillSpaces = Array(spaces).fill('\xa0').join('');
	return str.split('').join(fillSpaces);
};

/**
 * get current day
 * @returns {string}
 */
const getCurrentDay = () => {
	const date = new Date();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[date.getDay()];
};

/**
 * get current minutes
 * @returns {string}
 */
const getCurrentTime = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours}:${minutes}`;
};

export {
	addLetterSpacing,
	getCurrentDay,
	getCurrentTime
};
