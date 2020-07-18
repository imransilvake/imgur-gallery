// react
import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi, dataSelector } from '../../../slices/proxy';

// app
import './Weather-Card.scss';
import { AppOptions, AppServices } from '../../../../app.config';
import I01d from '../../../../assets/images/01d.png';
import I02d from '../../../../assets/images/02d.png';
import I03d from '../../../../assets/images/03d.png';
import I04d from '../../../../assets/images/04d.png';
import I09d from '../../../../assets/images/09d.png';
import I10d from '../../../../assets/images/10d.png';
import I11d from '../../../../assets/images/11d.png';
import I13d from '../../../../assets/images/13d.png';
import I01n from '../../../../assets/images/01n.png';
import I02n from '../../../../assets/images/02n.png';
import I03n from '../../../../assets/images/03n.png';
import I04n from '../../../../assets/images/04n.png';
import I09n from '../../../../assets/images/09n.png';
import I10n from '../../../../assets/images/10n.png';
import I11n from '../../../../assets/images/11n.png';
import I13n from '../../../../assets/images/13n.png';
import { addLetterSpacing, getCurrentDay, getCurrentTime } from '../../../utilities/helpers/Helper';

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
		case '01n': return I01n;
		case '02n': return I02n;
		case '03n': return I03n;
		case '04n': return I04n;
		case '09n': return I09n;
		case '10n': return I10n;
		case '11n': return I11n;
		case '13n': return I13n;
		default: break;
	}
	return true;
};

const WeatherCard = () => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector(dataSelector);
	const [city] = useState('islamabad');

	// use effect
	useEffect(() => {
		const queryParams = `?q=${city}&appid=${AppOptions.API_KEY}&units=metric`;
		const payload = { queryParams };

		// dispatch: fetch data
		dispatch(fetchApi(AppServices.WEATHER.GET_WEATHER.URL, payload));
	}, [dispatch, city]);

	return (
		<section>
			{
				loading ? <div>Loading</div> : (
					data && data['weather'] && data['weather'].map((item) => (
						<div className="wf-card" key={item.id}>
							<div className="wf-block-1">
								<h1>{ addLetterSpacing(data.name, 2) }</h1>
								<div className="wf-sides">
									<h6>{ addLetterSpacing(getCurrentDay(), 1) }</h6>
									<h6>{ addLetterSpacing(getCurrentTime(), 1) }</h6>
								</div>
							</div>
							<div className="wf-block-2">
								<img src={getWeatherImage(item.icon)} alt={item.icon} />
							</div>
							<div className="wf-block-3">
								<h2>{ `${Math.round(data['main']['temp'])}°` }</h2>
								<p>{ item.description }</p>
							</div>
						</div>
					))
				)
			}
		</section>
	);
};
export default WeatherCard;
