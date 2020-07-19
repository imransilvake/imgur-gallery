// react
import React from 'react';

// app
import './Weather-Form.scss';
import { FormControl, MenuItem, InputLabel, Select } from '@material-ui/core';

const WeatherForm = ({ city, setCity }) => {
	/**
	 * handle change event
	 * @param event
	 */
	const handleChange = (event) => {
		// set state: setCity
		setCity(event.target.value);
	};

	return (
		<section className="wf-form">
			<FormControl variant="filled" className="wf-city-control">
				<InputLabel id="wf-city">City</InputLabel>
				<Select className="wf-city-select" labelId="wf-city" onChange={handleChange} value={city}>
					<MenuItem value="islamabad">Islamabad</MenuItem>
					<MenuItem value="dusseldorf">Düsseldorf</MenuItem>
					<MenuItem value="lahore">Lahore</MenuItem>
					<MenuItem value="berlin">Berlin</MenuItem>
				</Select>
			</FormControl>
		</section>
	);
};
export default WeatherForm;
