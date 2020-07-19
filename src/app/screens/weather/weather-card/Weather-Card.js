// react
import React, { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi, dataSelector } from '../../../slices/proxy';

// app
import './Weather-Card.scss';
import { AppOptions, AppServices } from '../../../../app.config';
import { getCurrentDay, getCurrentTime } from '../../../utilities/helpers/Date';
import { addLetterSpacing, getWeatherImage } from '../../../utilities/helpers/Helper';
import CircularProgress from '@material-ui/core/CircularProgress';

const WeatherCard = ({ city }) => {
	const dispatch = useDispatch();
	const { data, loading, errors } = useSelector(dataSelector);

	useEffect(() => {
		// fetch weather data
		const fetchWeatherData = () => {
			// payload
			const payload = {
				queryParams: `?q=${city}&appid=${AppOptions.API_KEY}&units=metric`
			};

			// dispatch: fetch data
			dispatch(fetchApi(AppServices.WEATHER.GET_WEATHER.URL, payload));
		};

		// fetch weather data
		fetchWeatherData();

		// set interval
		const interval = setInterval(() => fetchWeatherData(), AppOptions.INTERVAL.WEATHER);

		// clean up
		return () => clearInterval(interval);
	}, [dispatch, city]);

	/**
	 * weather card view
	 * @returns {*}
	 */
	const cardView = () => {
		// loading
		if (loading) {
			return <div className="wf-loader"><CircularProgress /></div>;
		}

		// weather data
		if (data && data['weather']) {
			return data['weather'].map((item) => (
				<div className="wf-card" key={item.id}>
					<div className="wf-block-1">
						<h1>{ addLetterSpacing(data.name, 2) }</h1>
						<div className="wf-sides">
							<h6>{ addLetterSpacing(getCurrentDay(), 1) }</h6>
							<h6>{ addLetterSpacing(getCurrentTime(data['dt'], data['timezone']), 1) }</h6>
						</div>
					</div>
					<div className="wf-block-2">
						<img src={getWeatherImage(item.icon)} alt={item.icon} />
					</div>
					<div className="wf-block-3">
						<h2>{ `${Math.round(data['main']['temp_min'])}°` }</h2>
						<p>{ item.description }</p>
					</div>
				</div>
			));
		}

		// error
		return errors && (
			<div className="wf-error">
				{ errors['cod'] && (<h3>{ errors['cod'] }</h3>) }
				{ errors['message'] && (<p>{ errors['message'] }</p>) }
			</div>
		);
	};

	return (
		<section className="wf-card-wrapper">
			{ cardView() }
		</section>
	);
};
export default WeatherCard;
