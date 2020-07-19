// react
import React, { useEffect, useState } from 'react';

// app
import './Weather-Form.scss';
import TextField from '@material-ui/core/TextField';

const WeatherForm = ({ city, setCity }) => {
	// hook: setValue
	const [value, setValue] = useState(city);

	useEffect(() => {
		// set timeout
		// set state: setCity
		const timer = setTimeout(() => setCity(value), 1000);

		// clean up
		return () => clearTimeout(timer);
	}, [value, setCity]);

	/**
	 * handle change event
	 * @param event
	 */
	const handleChange = (event) => {
		// set state: setValue
		setValue(event.target.value);
	};

	return (
		<section className="wf-form">
			<TextField
				label="City*"
				id="text"
				type="text"
				name="text"
				value={value}
				onChange={handleChange}
				onBlur={handleChange}
				variant="filled"
				InputProps={{
					className: 'wf-input'
				}}
				fullWidth />
		</section>
	);
};
export default WeatherForm;
