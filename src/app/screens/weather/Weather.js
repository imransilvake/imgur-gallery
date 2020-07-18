// react
import React from 'react';

// app
import WeatherForm from './weather-form/Weather-Form';
import WeatherCard from './weather-card/Weather-Card';

const Todo = () => {
	return (
		<section className="wf-wrapper">
			{/* Form */}
			<WeatherForm />

			{/* Card */}
			<WeatherCard />
		</section>
	);
};
export default Todo;
