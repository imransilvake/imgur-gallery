// react
import React, { useEffect, useRef } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { galleryFilters, galleryReset } from '../../../slices/gallery';
import { proxyReset } from '../../../slices/proxy';

// app
import './Gallery-Filters.scss';
import {
	Container, Switch, MenuItem, Select
} from '@material-ui/core';

const GalleryFilters = () => {
	const dispatch = useDispatch();
	const isFirstRun = useRef(true);
	const [state, setState] = React.useState({
		viral: true,
		section: 'hot',
		sort: 'viral',
		window: 'day'
	});

	useEffect(() => {
		// skip first call
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		// reset gallery state
		dispatch(galleryReset());

		// reset proxy state
		dispatch(proxyReset());

		// apply filters
		dispatch(galleryFilters(state));
	}, [dispatch, state]);

	/**
	 * on handle change event
	 * @param event
	 */
	const handleChange = (event) => {
		const { name, value, checked } = event.target;
		if (checked !== undefined) {
			setState({ ...state, [name]: checked });
		} else {
			setState({ ...state, [name]: value });
		}
	};

	return (
		<Container maxWidth="md" className="ig-gallery-filters">
			<div className="ig-content">
				<Switch name="viral" checked={state.viral} onChange={handleChange} />

				<Select name="section" value={state.section} onChange={handleChange}>
					<MenuItem value="hot">Hot</MenuItem>
					<MenuItem value="top">Top</MenuItem>
					<MenuItem value="user">User</MenuItem>
				</Select>

				<Select name="sort" value={state.sort} onChange={handleChange}>
					<MenuItem value="viral">Viral</MenuItem>
					<MenuItem value="top">Top</MenuItem>
					<MenuItem value="time">Time</MenuItem>
					{
						state.section === 'user' && <MenuItem value="rising">Rising</MenuItem>
					}
				</Select>

				<Select name="window" value={state.window} onChange={handleChange}>
					<MenuItem value="day">Day</MenuItem>
					<MenuItem value="week">Week</MenuItem>
					<MenuItem value="month">Month</MenuItem>
					<MenuItem value="year">Year</MenuItem>
					<MenuItem value="all">All</MenuItem>
				</Select>
			</div>
		</Container>
	);
};
export default GalleryFilters;
