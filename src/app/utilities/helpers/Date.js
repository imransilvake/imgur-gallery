// app
import moment from 'moment';

/**
 * get current day
 * @returns {string}
 */
const getCurrentDay = () => {
	return moment().format('dddd');
};

/**
 * get current minutes
 * @returns {string}
 */
const getCurrentTime = (dt, timezone) => {
	const datetime = moment.unix(dt).utc().add(timezone, 's');
	return datetime.format('HH:mm');
};

export {
	getCurrentDay,
	getCurrentTime
};
