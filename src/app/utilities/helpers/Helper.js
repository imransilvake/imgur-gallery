// app
import I01d from '../../../assets/images/01d.png';
import I02d from '../../../assets/images/02d.png';
import I03d from '../../../assets/images/03d.png';
import I04d from '../../../assets/images/04d.png';
import I09d from '../../../assets/images/09d.png';
import I10d from '../../../assets/images/10d.png';
import I11d from '../../../assets/images/11d.png';
import I13d from '../../../assets/images/13d.png';
import I50d from '../../../assets/images/50d.png';
import I01n from '../../../assets/images/01n.png';
import I02n from '../../../assets/images/02n.png';
import I03n from '../../../assets/images/03n.png';
import I04n from '../../../assets/images/04n.png';
import I09n from '../../../assets/images/09n.png';
import I10n from '../../../assets/images/10n.png';
import I11n from '../../../assets/images/11n.png';
import I13n from '../../../assets/images/13n.png';
import I50n from '../../../assets/images/50n.png';

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
 * get weather image
 * @param icon
 * @returns {boolean}
 */
const getWeatherImage = (icon) => {
	switch (icon) {
		case '01d': return I01d;
		case '02d': return I02d;
		case '03d': return I03d;
		case '04d': return I04d;
		case '09d': return I09d;
		case '10d': return I10d;
		case '11d': return I11d;
		case '13d': return I13d;
		case '50d': return I50d;
		case '01n': return I01n;
		case '02n': return I02n;
		case '03n': return I03n;
		case '04n': return I04n;
		case '09n': return I09n;
		case '10n': return I10n;
		case '11n': return I11n;
		case '13n': return I13n;
		case '50n': return I50n;
		default: break;
	}
	return I01d;
};

export {
	addLetterSpacing,
	getWeatherImage
};
